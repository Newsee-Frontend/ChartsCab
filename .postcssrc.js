// https://github.com/michael-ciniawsky/postcss-load-config
const prodConfig = require('./env.param.config').prod;


const plugins = {
  "postcss-import": {},
  "postcss-url": {},
  // to edit target browsers: use "browserslist" field in package.json
  "autoprefixer": {},
};

if (prodConfig.usepxtorem) {
  plugins['postcss-pxtorem'] = {
    rootValue: 16,
    propList: ['*']
  }
}

module.exports = {
  'plugins': plugins
};
