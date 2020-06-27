module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/index.d.ts"],
  collectCoverage: true,
};
