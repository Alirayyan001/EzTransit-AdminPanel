const express = require('express');
const router = express.Router();
const topupController = require('../controllers/topupController');

router.get('/', topupController.getAllTopups);
router.delete('/:id', topupController.deleteTopup);
router.post('/:id/approve', topupController.approveTopup);
router.post('/:id/decline', topupController.declineTopup);
router.get('/approved', topupController.getApprovedTopups);
router.get('/declined', topupController.getDeclinedTopups);

module.exports = router;
