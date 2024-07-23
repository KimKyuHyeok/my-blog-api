module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost/api/',
        changeOrigin: true,
        pathRewrite:{ "^/api" : '' }
      }
    },
    headers: { "Access-Control-Allow-Origin": "*"}
  }
}
