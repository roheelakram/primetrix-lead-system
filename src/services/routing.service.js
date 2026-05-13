const { routingConfig } = require('../config/scoring.config');

function routeLead(score) {
  const match = routingConfig
    .sort((a, b) => a.priority - b.priority)
    .find(r => score >= r.minScore && score <= r.maxScore);

  return match
    ? { label: match.label, priority: match.priority }
    : { label: 'Disqualified', priority: 4 };
}

function getRouteDefinitions() {
  return routingConfig.map(({ label, minScore, maxScore, priority }) => ({
    label, minScore, maxScore, priority
  }));
}

module.exports = { routeLead, getRouteDefinitions };
