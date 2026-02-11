export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)\\.svg$': '<rootDir>/config/jest/EmptyMock.js',
    '\\.svg$': '<rootDir>/config/jest/EmptyMock.js',
    '^@citydrive/shared$': '<rootDir>/packages/shared/src/index.ts',
    '^@citydrive/entities$': '<rootDir>/packages/entities/src/index.ts',
    '^@citydrive/auth$': '<rootDir>/packages/auth/src/index.ts',
    '^@citydrive/shared/(.*)$': '<rootDir>/packages/shared/src/$1',
    '^@citydrive/entities/(.*)$': '<rootDir>/packages/entities/src/$1',
    '^@citydrive/auth/(.*)$': '<rootDir>/packages/auth/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './jest-report',
        filename: 'report.html',
        openReport: process.env.GENERATE_REPORT === 'true' ?? false,
        pageTitle: 'Ситидрайв личный кабинет - тесты',
        expand: true,
      },
    ],
  ],
};
