const express = require('express')
const path = require('path')

const app = express()

// server routes

app.get('/hello', (req, res) => {
  res.send({ hi: 'there' })
})
if (process.env.NODE_ENV !== 'productio') {
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.js')

  app.use(webpackMiddleware(webpack(webpackConfig), webpackConfig.devServer))
} else {
  app.use(express_static('dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'))
