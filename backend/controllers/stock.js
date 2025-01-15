const { default: mongoose } = require('mongoose');
const reelModel = require('../schemas/reel');
const orderModel = require('../schemas/order');
const router = require('express').Router();

router.get('', async (request, response) => {
    try {
        response.json(await reelModel.find({ status: { $exists: false } }).exec())
    } catch(e) {
        response.status(500).send()
    }
});

router.get('/reelGroup', async (request, response) => {
    const keyPropertyOrder = ['gsm', 'size', 'shade', 'bf'];

    const reels = await reelModel.find({ status: { $exists: false } }).exec();

    const grouped = {};

    reels.forEach(reel => {
        const key = keyPropertyOrder.map(property => reel[property]).join('-');

        if (!grouped[key]) {
            grouped[key] = {
                'gsm': reel['gsm'],
                'size': reel['size'],
                'shade': reel['shade'],
                'bf': reel['bf'],
                'qty': 0
            };
        }

        (grouped[key].qty) += 1; 
    });

    const activeOrders = await orderModel.find({ active: true }).sort({ date: -1 }).populate({
        path: 'orderReelGroups.reels',
        model: 'Reel'
    });

    activeOrders.forEach(order => {
        order.orderReelGroups.forEach(orderReelGroup => {
            const key = keyPropertyOrder.map(property => orderReelGroup[property]).join('-');
            grouped[key].qty -= orderReelGroup.qty;
            if(grouped[key].qty === 0) {
                delete grouped[key];
            }
        }) 
    })

    response.json(Object.values(grouped));
});

module.exports = router;