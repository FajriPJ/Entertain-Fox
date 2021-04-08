const express = require('express')
const {connectMongodb, getDatabase} = require('./config/mongodb');

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

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json('Hello World!!!')
})

app.get('/movies', (req,res) => {
  getDatabase()
    .collection('Movies')
    .find()
    .toArray()
      .then(({data}) => {
        // console.log({data});
        res.status(200).json(data)
        
      })
      .catch(err => {
        console.log(err);
      })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})