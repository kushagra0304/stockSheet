const router = require('express').Router();
const companyModel = require("../schemas/company")

router.post('/add', async (request, response) => {
    try {
        const { body } = request;

        const addedCompany = await companyModel.create({
            name: body.name,
            gstin: body.gstin
        });

        return response.send(addedCompany);
    } catch(e) {
        response.status(500).send()
    }
})

router.get('/getAll', async (request, response) => {
    try {
        const companies = await companyModel.find({});

        return response.send(companies);
    } catch(e) {
        response.status(500).send()
    }
});

module.exports = router;