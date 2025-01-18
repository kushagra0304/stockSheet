const { default: mongoose } = require('mongoose');
const reelModel = require('../schemas/reel');
const shipmentModel = require('../schemas/shipment');
const router = require('express').Router();
const { Canvas } = require("canvas");
const njk = require('nunjucks')
const puppeteer = require('puppeteer');
var fs = require('fs');
const QRCode = require('qrcode')

const saveShipmentToDB = async (body, session) => {
    const dispatchToSave = body.dispatch

    const shipmentToSave = {
        millName: body.millName,
        billDate: (new Date(body.billDate)).getTime(),
        billNumber: body.billNumber,
        dispatch: null,
    }

    const dispatchSaved = await reelModel.insertMany(dispatchToSave, { session });
    
    shipmentToSave.dispatch = dispatchSaved.map(reel => reel._id);

    // Wrapping object in array is very fucking imp, or else it messes with transaction's atomicity property, meaning no rollback when error.
    const shipmentSaved = await shipmentModel.create([shipmentToSave], { session });

    shipmentSaved[0].dispatch = dispatchSaved;

    return shipmentSaved[0];
}

const convertDispatchIdsToBarcodes = async (dispatch) => {
    return Promise.all(
        dispatch.map(async (reel) => {
            return {
                qrcode: await QRCode.toDataURL(reel.id, { width: 340 }),
                text: `${reel.size}/${reel.gsm} | Weight: ${reel.weight}kg | Reel No: ${reel.reelNo}`
            };
        })
    );
};

const createHTMLPageFromBarcodes = (barcodes) => {
    njk.configure('template', { autoescape: true });
    return njk.render('barcodesPage.njk', { barcodes });
}
 
const convertPageToPdf = async (htmlPage) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlPage, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4', preferCSSPageSize: true });

    await browser.close();

    return Buffer.from(pdfBuffer);
}

const sendPdf = (pdf, res) => {
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=barcodes.pdf');
    res.status(200).send(pdf);
}

router.post(`/upload`, async (request, response) => {
    const { body } = request;  

    const session = await mongoose.startSession();

    try {
        let pdf = null;

        await session.withTransaction(async () => {
            const shipment = await saveShipmentToDB(body, session);

            const barcodes = await convertDispatchIdsToBarcodes(shipment.dispatch)

            const page = createHTMLPageFromBarcodes(barcodes);

            pdf = await convertPageToPdf(page);

            sendPdf(pdf, response);
        });
    } catch (error) {
        console.error('Transaction aborted:', error);
        response.status(500).send();
    } finally {
        session.endSession();
    }
});

module.exports = router;