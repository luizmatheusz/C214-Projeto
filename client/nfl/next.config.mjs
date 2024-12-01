/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilita a compatibilidade com Babel e SWC juntos
  swcMinify: true, // Habilitar minificação com SWC
  experimental: {
    forceSwcTransforms: true, // Força o uso do SWC para transformações
  },
  images: {
    domains: ["upload.wikimedia.org", "a.espncdn.com", "static.www.nfl.com"], // Adiciona o domínio permitido para carregar imagens externas
  },
  webpack(config, { isServer }) {
    // Se você precisar de configurações do Babel, você pode usá-las aqui
    if (!isServer) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      });
    }
    return config;
  },
};

export default nextConfig;
