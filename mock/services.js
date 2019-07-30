const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next()
})

const { LoginAPI } = require('./user');
app.post('/user/login', LoginAPI());

app.listen(80, () => {
  console.log('mock接口服务器启动完成，端口为：80')
})