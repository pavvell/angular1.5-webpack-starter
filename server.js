
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const fs = require('fs');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3001 : process.env.PORT;
const app = express();

if (isDeveloping) {
  console.log('develop mode...');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'frontend',
    stats: {
      colors: true,
      hash_type: 'hash',
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(express.static(__dirname + '/frontend/build'));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(fs.readFileSync(path.join(__dirname, 'public/index.html')));
    res.end();
  });
} else {
  console.log('prod mode...');
  app.use(express.static(__dirname + '/frontend'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
