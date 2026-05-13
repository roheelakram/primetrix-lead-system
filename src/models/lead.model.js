const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    company:       { type: String, required: true, trim: true },
    email:         { type: String, trim: true, lowercase: true, default: '' },
    industry:      { type: String, enum: ['saas','agency','consulting','it','other',''], default: '' },
    companySize:   { type: String, enum: ['1-5','5-50','50-200','200+',''], default: '' },
    budget:        { type: String, enum: ['low','mid','high',''], default: '' },
    intent:        { type: String, enum: ['cold','warm','hot',''], default: '' },
    decisionMaker: { type: String, enum: ['yes','maybe','no',''], default: '' },
    geography:     { type: String, enum: ['tier1','tier2','other',''], default: '' },
    score:         { type: Number, default: 0, min: 0, max: 100 },
    route:         { type: String, default: '' },
    priority:      { type: Number, default: 4 },
    state:         { type: String, enum: ['New','Scored','Routed','Updated'], default: 'New' },
    notes:         { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
