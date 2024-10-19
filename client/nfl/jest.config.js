module.exports = {
  testEnvironment: "jest-environment-jsdom", // Especifique o ambiente jsdom
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Remova o '/extend-expect' se o erro persistir
};
