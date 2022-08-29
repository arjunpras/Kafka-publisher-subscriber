const router = require('express').Router();
const medicineDbController = require('../controllers/controller.productDbAdmin');

//get complete collection from database
router.get('/getMedicine', medicineDbController.getAll);

//get document using unique ID from db
router.get('/getMedicine/:id', medicineDbController.getById);

//add document into the database
router.post('/addMedicine', medicineDbController.addMedicine);

//delete document using ID
router.delete('/deleteMedicine/:id', medicineDbController.deleteById);

//update the already present document using the document ID
router.patch('/updateMedicine/:id', medicineDbController.updateById);

module.exports = router;