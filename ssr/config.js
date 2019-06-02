/**
 * @author wangmeilan<gzwangmeilan@163.com>
 * @date 16/5/19
 * @description ssr配置文件，配置详细说明请看README.md
 **/

module.exports = {
  //服务端源代码路径
  assets:'./dist',
  //输出目录
  output:'./output',
  //爬虫访问的路由集合
  path: ['/',
    '/404'],
  host:'http://ssr.100.com',
  port:8009
};
