const express = require('express');
const router = express.Router();
const { createLead, getLeads, getLeadById, updateLead, getRoutes } = require('../controllers/lead.controller');

router.get('/meta/routes', getRoutes);
router.post('/',     createLead);
router.get('/',      getLeads);
router.get('/:id',   getLeadById);
router.patch('/:id', updateLead);

module.exports = router;
