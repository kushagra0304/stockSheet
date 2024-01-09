const { default: mongoose } = require('mongoose');
const reelModel = require('../schemas/reel');
const router = require('express').Router();

router.get('', async (request, response) => {
    try {
        response.json(await reelModel.find({ sold: false }).exec())
    } catch(e) {
        response.status(500).send()
    }
});

module.exports = router;