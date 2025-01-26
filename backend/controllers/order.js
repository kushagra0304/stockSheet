const { default: mongoose } = require('mongoose');
const orderModel = require('../schemas/order');
const reelModel = require('../schemas/reel');
const router = require('express').Router();

router.get('/:orderType', async (request, response) => {
    let orders = null;

    const { orderType } = request.params;

    if(orderType == null){
        throw new Error("Order type not defined");
    }

    if(orderType == "active") {
        try {
            orders = await orderModel.find({ active: true }).sort({ date: -1 }).populate({
                path: 'orderReelGroups.reels',
                model: 'Reel'
            });
        } catch {
            throw new Error("Could not fetch active orders.");
        }
    } else if(orderType == "dispatched") {
        try {
            orders = await orderModel.find({ active: { $exists: false }}).sort({ date: -1 }).populate({
                path: 'orderReelGroups.reels',
                model: 'Reel'
            });
        } catch {
            throw new Error("Could not fetch dispatched orders.");
        }
    } else {
        throw new Error("Invalid order type");
    }

    response.send(orders);
});

router.get('/single/:id', async (request, response) => {
    const { id } = request.params;

    const order = await orderModel.findById(id).populate({
        path: 'orderReelGroups.reels',
        model: 'Reel'
    });

    response.send(order);
});

router.post('', async (request, response) => {
    const { body } = request;

    const createdOrder = await orderModel.create({
        customerName: body.customerName,
        orderReelGroups: body.orderReelGroups,
        active: true,
    });

    response.send(createdOrder);
});

router.post('/addReel', async (request, response) => {
    const { body } = request;
    
    const order = await orderModel.findById(body.orderId);
    const reel = await reelModel.findById(body.reelId);

    if(reel.status === 'active') {
        response.send('reel already added');
        return;
    }

    let success = false;

    order.orderReelGroups.forEach((group) => {
        if(`${group.gsm}.${group.size}.${group.shade}.${group.bf}` === `${reel.gsm}.${reel.size}.${reel.shade}.${reel.bf}`) {
            success = true;
            group.reels.push(reel.id);
            reel.status = 'active';
        }
    })

    const session = await mongoose.startSession();
    session.startTransaction();

    if(success) {
        try {         
            await order.save({ session });
            await reel.save({ session });
                    
            await session.commitTransaction(); 
            response.send(order); 
        } catch(error) {
            await session.abortTransaction();
            throw error;
        }
    } else {
        throw new Error("Reel not found in the order");
    }
    
    session.endSession();
});



module.exports = router;