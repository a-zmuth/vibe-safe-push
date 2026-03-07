

const premiumPatterns = [
  {
    name: 'AWS Access Key ID',
    regex: /AKIA[0-9A-Z]{16}/,
    explanation: 'Found an AWS Access Key ID. When paired with a Secret Access Key, this grants full programmatic access to your AWS account.',
  },
  {
    name: 'AWS Secret Access Key',
    regex: /[0-9a-zA-Z\/+=]{40}/,
    explanation: 'Found a string that looks like an AWS Secret Access Key. This is highly sensitive and provides administrator-level access to your AWS resources.',
  },
  {
    name: 'Firebase Config',
    regex: /"firebase":\s*\{/,
    explanation: 'Found a Firebase configuration block. This can expose your database URL, API keys, and other sensitive project details.',
  },
  {
    name: 'JSON Web Token (JWT)',
    regex: /ey[a-zA-Z0-9_-]+\.ey[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/,
    explanation: 'Found a JSON Web Token (JWT). If this token is not expired, it can be used to impersonate a user and access protected routes in an application.',
  },
  {
    name: 'Private Key',
    regex: /-----BEGIN ((RSA|OPENSSH|EC|PGP) )?PRIVATE KEY-----/,
    explanation: 'Found a private key block. Private keys are the ultimate secret and are used for encryption and signing. They should never be hardcoded.',
  },
  {
    name: 'OAuth 2.0 Client Secret',
    regex: /client_secret\s*=\s*['"]?[a-zA-Z0-9_.-]+['"]?/,
    explanation: 'Found an OAuth 2.0 Client Secret. This secret is used to authenticate your application with an OAuth provider.',
  },
  {
    name: 'Database Connection String',
    regex: /(mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis|sqlite):\/\/[^\s'"]+/i,
    explanation: 'Found a database connection string. Exposing these in your code can allow unauthorized access to your entire database.',
  },
  {
    name: 'Insecure Database Query',
    regex: /SELECT\s+\*\s+FROM\s+/i,
    explanation: 'Found a broad SQL query (SELECT *). This is a bad practice that can lead to leaking more data than necessary, potentially exposing sensitive fields from your database.',
  },
  {
    name: 'Hardcoded Database Password',
    regex: /DB_PASSWORD\s*=\s*['"]?.+['"]?/i,
    explanation: 'Found a hardcoded database password. Use environment variables instead to keep your database credentials secure.',
  },
];

module.exports = premiumPatterns;
