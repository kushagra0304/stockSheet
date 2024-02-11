const { default: mongoose } = require('mongoose');
const orderModel = require('../schemas/order');
const router = require('express').Router();

router.post('/createOrder', async (request, response) => {
    try {
        const { body } = request;

        const createdOrder = await orderModel.create({
            customerName: body.customerName,
            orderReelGroups: body.orderReelGroups,
            active: true,
        });

        return response.send(createdOrder);
    } catch(e) {
        response.status(500).send()
    }
});

module.exports = router;