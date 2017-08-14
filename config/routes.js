const Index = require('../app/controller/index')//模型
const express = require('express')
const router = express.Router()

Index(router)

module.exports =  router