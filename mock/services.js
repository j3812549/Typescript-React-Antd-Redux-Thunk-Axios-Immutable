const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options') {
      res.send(200);  //让options尝试请求快速结束
    }
  next()
})

const { LoginAPI } = require('./user');
app.post('/user/login', LoginAPI());

app.listen(80, () => {
  console.log('mock接口服务器启动完成，端口为：80')
})