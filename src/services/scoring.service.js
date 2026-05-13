const { scoringConfig } = require('../config/scoring.config');

function scoreLead(leadData) {
  const { industry, companySize, budget, intent, decisionMaker, geography } = leadData;

  const getPoints = (category, value) => {
    const map = scoringConfig[category];
    if (!map) return 0;
    return map[value] !== undefined ? map[value] : map.default || 0;
  };

  const raw =
    getPoints('industry',      industry)      +
    getPoints('companySize',   companySize)   +
    getPoints('budget',        budget)        +
    getPoints('intent',        intent)        +
    getPoints('decisionMaker', decisionMaker) +
    getPoints('geography',     geography);

  return Math.min(raw, scoringConfig.maxScore);
}

function scoreBreakdown(leadData) {
  const { industry, companySize, budget, intent, decisionMaker, geography } = leadData;

  const getPoints = (category, value) => {
    const map = scoringConfig[category];
    if (!map) return 0;
    return map[value] !== undefined ? map[value] : map.default || 0;
  };

  return {
    industry:      getPoints('industry',      industry),
    companySize:   getPoints('companySize',   companySize),
    budget:        getPoints('budget',        budget),
    intent:        getPoints('intent',        intent),
    decisionMaker: getPoints('decisionMaker', decisionMaker),
    geography:     getPoints('geography',     geography),
    total:         scoreLead(leadData),
  };
}

module.exports = { scoreLead, scoreBreakdown };
