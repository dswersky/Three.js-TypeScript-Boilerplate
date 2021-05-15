const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('../../src/client/webpack.mw');
const compiler = webpack(config);

config.plugins.push(new webpack.HotModuleReplacementPlugin());
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/',
  })
);
app.use(webpackHotMiddleware(compiler));

//app.use(express.static(path.join(__dirname, '../client')));

const initRoutes = require("./routes");

app.use(express.urlencoded({extended: true}));
initRoutes(app);

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});