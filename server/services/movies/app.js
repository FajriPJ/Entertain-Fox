const express = require('express')
const {connectMongodb} = require('./config/mongodb');
const router = require('./routes');

const app = express()
const port = 4001

connectMongodb((connected) => {
  if (connected) {
    console.log('connect mongodb success')
  } 
  else {
    console.log('connect mongodb error')
  } 
})


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)
app.get('/', (req, res) => {
  res.status(200).json('Hello World!!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})