

const basicPatterns = [
  {
    name: 'Generic API Key',
    regex: /api[_-]?key\s*=\s*['"]?[a-zA-Z0-9_.-]+['"]?/i,
    explanation: 'Found a potential API key. These keys grant access to services and should never be stored directly in code.',
  },
  {
    name: 'Google API Key',
    regex: /AIza[0-9A-Za-z\-_]{35}/,
    explanation: 'Found a Google API Key. Exposing this can lead to misuse of your Google Cloud services and unexpected charges.',
  },
  {
    name: 'Stripe API Key',
    regex: /(?:r|s)k_live_[0-9a-zA-Z]{24}/,
    explanation: 'Found a Stripe API Key. This key can be used to make payments and access your Stripe account data. Keep it secret!',
  },
];

module.exports = basicPatterns;
