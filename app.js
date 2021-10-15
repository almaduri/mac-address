const express = require('express')
const mongoose = require('mongoose')
const _ = require('lodash')
const { set } = require('lodash')
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.znyyn.mongodb.net/${dbName}`);

const macSchema = {
  mac_address: String,
  detail: String
}

const Mac = mongoose.model('Mac', macSchema)

