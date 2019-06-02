/**
 * @author wangmeilan<gzwangmeilan@163.com>
 * @date 16/5/19
 * @description 静态化spa代码，详细说明请看README.md
 **/
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const url = require('url');
const config = require('./config.js');
const utils = require('./utils.js');
const argv = require('minimist')(process.argv.slice(2));

const defaults = {
  assets: './dist',
  output: './output',
  path: ['/'],
  host: null,
  port:8009
};
const params = { ...defaults, ...config};

console.log('params: %o', params);
console.log( 'NODE_ENV:%s',argv.NODE_ENV);

(async () => {
  const assets = params.assets+'/'+argv.NODE_ENV;
if (params.assets !== null) {
  const host = await  utils.createAssetsServer(assets,params.port);
  params.host = params.host || host;
}

const browser = await puppeteer.launch();
const page = await browser.newPage();
const output = params.output+'/'+argv.NODE_ENV;
await new Promise(function(resolve, reject) {
  fs.exists(output,function(exists){
    if(exists){
      fs.removeSync(output);
    }

    /*   fs.mkdir(output, { recursive: true  }, function(err) {
         if (err) {
           console.log(err);
           reject(err);
           return;
         }
         resolve();
       });
 */
    fs.copy(assets, output, err => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`copy files from ${assets} to ${output}`);
    resolve();
  })
  });
});


for (const p of params.path) {
  const uri = url.parse(params.host + p);
  const response = await page.goto(uri.href);
  //生成的静态文件以'.html'结尾，路由不以'.html'结尾的加上'.html'
  var name = uri.pathname ;
  if(!uri.pathname.match(/.*\.html$/)){
    name = uri.pathname === '/'?'index.html':uri.pathname + '.html';
  }
  if (!response.ok) {
    continue;
  }
  await page.waitFor(500);//延迟时间，以等待页面获取接口数据渲染页面
  const content = await page.content();
  const filename = path.join(output, name);
  const parsed = path.parse(filename);
  const dir = path.resolve(parsed.dir);

  await new Promise(function(resolve) {
    fs.mkdir(dir, { recursive: true  }, function(err) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve();
    });
  });

  const stream = fs.createWriteStream(filename, {
    // Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
    flags: 'w',
    autoClose: true
  });
  stream.write(content);
  console.log('write content into '+name);
}

await browser.close();
process.exit();

})();
