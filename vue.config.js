module.exports = {
  productionSourceMap: false,
  // chainWebpack: config => config.resolve.symlinks(false),
  chainWebpack: config => {
    config.module.rules.delete('eslint');
},
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/variables.scss";
          @import "@/assets/scss/mixins.scss";
        `
      }
    }
  }
};
