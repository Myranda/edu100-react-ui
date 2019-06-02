# 实现方式

### 搭建一个SPA服务器。
使用webpack编译为静态资源代码，然后通过nodejs构建一个静态资源服务。 

### 使用chrome(爬虫)去访问链接，并将结果输出到文件


#配置说明
  `assets`:(string) 必填 webpack编译的静态资源代码，根据命令行传入的NODE_ENV，静态服务器的根目录路径为${assets}/${NODE_ENV}
  `output`:(string) 必填 输出目录 
  `port`: (number) 非必填 静态服务器拉起服务的端口，默认为8009
  `host`:(string) 非必填 chrome(爬虫)访问host，主要用于解决某些接口访问跨域限制。需配置nginx,
  如host:'http://ssr.100.com',nginx配置为
  
    ```js                  
            server {
              listen 80;
              server_name ssr.100.com;
              location / {
                 proxy_pass http://0.0.0.0:8009;//拉起的静态服务器默认域名端口为：0.0.0.0:8009
              }
             }
    ```
    
   若host为空或者null，chrome(爬虫)将访问http://0.0.0.0:${port}                             
  `path`: (Array)  必填 chrome(爬虫)访问路由集合，爬虫访问链接为${host}${path[index]}
 
  
  ###注意事项
  1.对于需要上cdn的资源，需发布了静态资源再运行ssr，不然静态化过程会访问不了静态资源
  
  
};
