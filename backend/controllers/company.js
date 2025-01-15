const router = require('express').Router();
const companyModel = require("../schemas/company")

router.post('/add', async (request, response) => {
    const { body } = request;

    console.log(body);

    const addedCompany = await companyModel.create({
        name: body.name,
        gstin: body.gstin
    });

    return response.send(addedCompany);
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