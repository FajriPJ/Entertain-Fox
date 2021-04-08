const express = require('express');
const app = express();
const router = require('./routes');
const { connectMongodb } = require('./config/mongodb');
const port = 4002


connectMongodb((connected) => {
  if (connected) {
    console.log('connect mongodb success');
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    app.use(router)
    
    app.get('/', (req, res) => {
      res.status(200).json('Hello World!!!')
    })

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  } else {
    console.log('connect mongodb error');
  }
})


