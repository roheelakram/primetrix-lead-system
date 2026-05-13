const scoringConfig = {
  industry: {
    saas:       25,
    agency:     25,
    consulting: 25,
    it:         25,
    other:      10,
    default:     0,
  },
  companySize: {
    '5-50':   20,
    '50-200': 10,
    '1-5':     5,
    '200+':    3,
    default:   0,
  },
  budget: {
    high:    25,
    mid:     15,
    low:      0,
    default:  0,
  },
  intent: {
    hot:     15,
    warm:     8,
    cold:     0,
    default:  0,
  },
  decisionMaker: {
    yes:     10,
    maybe:    5,
    no:       0,
    default:  0,
  },
  geography: {
    tier1:   5,
    tier2:   2,
    other:   0,
    default: 0,
  },
  maxScore: 100,
};

const routingConfig = [
  { label: 'Client Ready', minScore: 75, maxScore: 100, priority: 1 },
  { label: 'Warm Lead',    minScore: 50, maxScore: 74,  priority: 2 },
  { label: 'Nurture',      minScore: 25, maxScore: 49,  priority: 3 },
  { label: 'Disqualified', minScore: 0,  maxScore: 24,  priority: 4 },
];

const leadStates = {
  NEW:     'New',
  SCORED:  'Scored',
  ROUTED:  'Routed',
  UPDATED: 'Updated',
  transitions: {
    New:     ['Scored'],
    Scored:  ['Routed'],
    Routed:  ['Updated'],
    Updated: [],
  }
};

module.exports = { scoringConfig, routingConfig, leadStates };
