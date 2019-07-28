const Mock = require('mockjs')

module.exports = {
  LoginAPI() {
    return (req, res) => {
      const user = req.body.user
      const password = req.body.password
      if (!user || !password) {
        res.send({ code: 400, data: '账户不能为空' })
        return
      }
      const data = Mock.mock({
        'userName': '@cname',
        'userId':  user
      })
      res.send({ code: 200, data: data})
    }
  }
}