'use strict'

var url = require('url');

// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

var path = require('path');

var workDir = path.resolve('.');
// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(workDir, 'webServer.js');
// '/Users/michael/pub/index.html'

console.log(filePath);

// 创建服务器
var  fs = require('fs'),
     http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

var server = http.createServer(function(request,response){
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathName = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filePath = path.join(root ,pathName);
    // 获取文件状态
    fs.stat(filePath,function(error , stats){
        if(!error && stats.isFile){
             // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filePath).pipe(response);
        }else{
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');