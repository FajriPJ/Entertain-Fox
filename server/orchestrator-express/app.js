const express = require('express');
const app = express();
const port = 4000;
const router = require("./routes/index.js")
const OrchesController = require('./controllers/orchesController');

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router) 

// app.get('/entertainme', OrchesController.readAll)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})