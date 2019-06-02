/**
 * @author wangmeilan<gzwangmeilan@163.com>
 * @date 16/5/19
 * @description 开启静态服务器工具
 */
const path = require('path');
const express = require("express");
const history = require('connect-history-api-fallback');
const env = require('../config/env');

/*
 * 开启静态服务器
 * @param assets {String} 服务器根目录
 */
exports.createAssetsServer = async (assets,port) => {
  const host = '0.0.0.0';
  return new Promise((resolve, reject) => {
  const app = express();
  const reg1 = new RegExp('^'+ env.raw.PUBLIC_URL+'[^'+env.raw.SUB_DIRECTORY+'\/]');
  const reg2 = new RegExp('^'+ env.raw.PUBLIC_URL);
  app.use(history({
    rewrites: [
      //非静态资源都访问根目录
      { from: reg1, to: '/' },
      {//后缀为js|css 访问dist下相应文件
        from: /^\/.*[js|css|png|jpg]$/,
        to: function(context) {
          return context.parsedUrl.pathname.replace(reg2,'');
        }
      },
    ],
    logger:console.log.bind(console)
  }));
  app.use(express.static(path.resolve(assets)));
  app.listen(port, host, function() {
    console.log("server listen on %s:%s", host, port);
    resolve('http://'+host+':'+port);
  });
}).then(value => {
    return value;
});
}

