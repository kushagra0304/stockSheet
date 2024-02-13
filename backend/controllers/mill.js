const router = require('express').Router();
const millModel = require("../schemas/mill")

router.post('/add', async (request, response) => {
    try {
        const { body } = request;

        const addedMill = await millModel.create({
            name: body.name,
            gstin: body.gstin
        });

        return response.send(addedMill);
    } catch(e) {
        response.status(500).send()
    }
});

module.exports = router;