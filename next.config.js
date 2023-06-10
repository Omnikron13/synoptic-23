export default {
   webpack(config, { webpack }) {
      config.experiments = { ...config.experiments, topLevelAwait: true };
      return config;
   }
};
