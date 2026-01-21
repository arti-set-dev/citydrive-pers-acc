export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "./jest-report",
      "filename": "report.html",     
      "openReport": process.env.GENERATE_REPORT === 'true' ?? false,           
      "pageTitle": "Ситидрайв личный кабинет - тесты",
      "expand": true                
    }]
  ]
};
