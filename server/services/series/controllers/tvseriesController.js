const TvSeries = require('../models/tvSeriesModel')


class TvSeriesController{

  static read(req, res) {
    TvSeries.readAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({message: "internal server error"})
      })  
  }

  static create(req, res) {

    let input = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    TvSeries.create(input) 
      .then(data => {
        res.status(201).json(data.ops[0])
      })
      .catch(err => {
        res.status(500).json({message: "internal server error"})
      })
  }

  static readOne(req, res) {
    console.log('masuuk readOne');
    let id = req.params.id
    TvSeries.readById(id)
      .then(data => {
        console.log(data);
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({message: "internal server error"})
      })
  }
  
  static update(req, res) {
    let id = req.params.id
    let tvSeriesUpdate = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }

    TvSeries.findIdandUpdate(id, tvSeriesUpdate)
      .then(data => {
        console.log('berhasil update');
        // res.status(201).json(data)
        res.status(201).json({message: "data updated"})

      })
      .catch(err => {
        res.status(500).json({message: "internal server error"})
      })
  }

  static delete(req, res) {
    let id = req.params.id
    TvSeries.delete(id)
      .then(data => {
        res.status(200).json({message: 'data deleted'})
      })
      .catch(err => {
        res.status(500).json({message: "internal server error"})
      })
  }
}

module.exports = TvSeriesController