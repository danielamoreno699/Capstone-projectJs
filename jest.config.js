module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['jest-fetch-mock'],

};
