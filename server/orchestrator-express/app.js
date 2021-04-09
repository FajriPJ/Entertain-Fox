const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;
const routes = require("./routes/index")
const OrchesController = require('./controllers/orchesController');

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/entertainme', OrchesController.readAll)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get(routes) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})