const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  clearMocks: true,
  moduleNameMapper: {
    '^(components|constants|contexts|contracts|errors|helpers|hooks|pages|queries|services|styles|typechain-types|utils)/(.*)$':
      '<rootDir>/$1/$2',
  },
  testEnvironment: 'node',
};

module.exports = createJestConfig(customJestConfig);
