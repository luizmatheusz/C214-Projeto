// module.exports = {
//   testEnvironment: "jest-environment-jsdom", // Especifique o ambiente jsdom
//   setupFilesAfterEnv: ["@testing-library/jest-dom"], // Remova o '/extend-expect' se o erro persistir
// };

// module.exports = {
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
//   },
// };

module.exports = {
  preset: "ts-jest", // Use ts-jest para TS
  transform: {
    // "^.+\\.(ts|tsx)$": "ts-jest", // Para arquivos TS/TSX, usa ts-jest
    "^.+\\.[jt]sx?$": "babel-jest", // Para arquivos JS/JSX, usa babel-jest
  },
  testEnvironment: "jsdom", // Usar jsdom para testes em React
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Suporte para arquivos .js, .jsx, .ts, .tsx
  transformIgnorePatterns: [
    "node_modules/(?!some-module-with-jsx|another-module)", // Caso precise transformar módulos dentro de node_modules
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // Arquivo de configuração para o Jest
};
