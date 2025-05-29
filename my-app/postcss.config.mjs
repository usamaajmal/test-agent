const config = {
  plugins: {
    '@tailwindcss/postcss': { // Corrected plugin key
      config: './src/app/styles/tailwind.config.ts',
    },
    autoprefixer: {},
  },
};

export default config;
