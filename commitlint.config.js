const apps = [
    'backend',
    'frontend',
    'database'
  ];
  const packages = [];
  module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'scope-enum': [2, 'always', [...apps, ...packages]],
    },
  };