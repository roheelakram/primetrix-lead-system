const Lead = require('../models/lead.model');
const { scoreLead, scoreBreakdown } = require('../services/scoring.service');
const { routeLead, getRouteDefinitions } = require('../services/routing.service');
const { leadStates } = require('../config/scoring.config');

const createLead = async (req, res) => {
  try {
    const { name, company, email, industry, companySize, budget, intent, decisionMaker, geography, notes } = req.body;
    if (!name || !company) {
      return res.status(400).json({ success: false, message: 'Name and company are required.' });
    }
    const leadData = { industry, companySize, budget, intent, decisionMaker, geography };
    const score = scoreLead(leadData);
    const breakdown = scoreBreakdown(leadData);
    const routing = routeLead(score);
    const lead = await Lead.create({
      name, company, email: email || '',
      ...leadData,
      score,
      route:    routing.label,
      priority: routing.priority,
      state:    leadStates.ROUTED,
      notes:    notes || '',
    });
    return res.status(201).json({
      success: true,
      message: 'Lead created, scored, and routed successfully.',
      data: { lead, scoring: { breakdown, total: score }, routing }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getLeads = async (req, res) => {
  try {
    const { route, state, minScore, maxScore, sortBy = 'createdAt', order = 'desc' } = req.query;
    const filter = {};
    if (route) filter.route = route;
    if (state) filter.state = state;
    if (minScore || maxScore) {
      filter.score = {};
      if (minScore) filter.score.$gte = parseInt(minScore);
      if (maxScore) filter.score.$lte = parseInt(maxScore);
    }
    const leads = await Lead.find(filter).sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    return res.status(200).json({
      success: true,
      summary: {
        total:        leads.length,
        clientReady:  leads.filter(l => l.route === 'Client Ready').length,
        warmLead:     leads.filter(l => l.route === 'Warm Lead').length,
        nurture:      leads.filter(l => l.route === 'Nurture').length,
        disqualified: leads.filter(l => l.route === 'Disqualified').length,
      },
      data: leads,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
    return res.status(200).json({ success: true, data: lead });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
    const { state, notes, route } = req.body;
    if (state && state !== lead.state) {
      const allowed = leadStates.transitions[lead.state] || [];
      if (!allowed.includes(state)) {
        return res.status(400).json({
          success: false,
          message: `Invalid transition: ${lead.state} → ${state}. Allowed: [${allowed.join(', ')}]`
        });
      }
      lead.state = state;
    }
    if (notes !== undefined) lead.notes = notes;
    if (route !== undefined) lead.route = route;
    await lead.save();
    return res.status(200).json({ success: true, message: 'Lead updated.', data: lead });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getRoutes = async (req, res) => {
  try {
    return res.status(200).json({ success: true, data: getRouteDefinitions() });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createLead, getLeads, getLeadById, updateLead, getRoutes };
