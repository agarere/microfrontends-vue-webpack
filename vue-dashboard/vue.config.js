const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: "http://localhost:8081",
  chainWebpack: config => {
    config.optimization.delete("splitChunks");
    config
      .plugin("module-federation-plugin")
      .use(require("webpack").container.ModuleFederationPlugin, [{
        remotes: {
          "notifications": "notifications@http://localhost:8080/remoteEntry.js"
        },
        shared: {
          "vue": {
            eager: true,
            singleton: false
          },
          "vuetify": {
            eager: true,
            singleton: false
          }
        }
      }])
  },
  transpileDependencies: [
    'vuetify'
  ]
})
