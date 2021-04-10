const TvSeries = require('../models/tvSeriesModel')
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis()
const url = "http://localhost:4002/tvseries/"

class TvSeriesController{

  static async read(req, res) {
     
    try {
      const series = JSON.parse(await redis.get('tvseries:alldata'))

      if (!series) {

        const readAllSeries = await TvSeries.readAll()
        redis.set('tvseries:alldata', JSON.stringify(readAllSeries))
        res.status(200).json(readAllSeries)

      } else {
        res.status(200).json(series)
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async create(req, res) {

    let input = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    try {
      await redis.del('tvseries:alldata')
      const newSeries = await TvSeries.create(input)
      res.status(201).json(newSeries.ops[0]);

    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async readOne(req, res) {

    let id = req.params.id

    try {
      const redisSeries = JSON.parse( await redis.get("tvseries:allData"))
      let readOneSeries;

      if (redisSeries) {
        const series = redisSeries.filter((seri) => seri._id === id)

        if (series){
          res.status(200).json(series)
        } else {
          readOneSeries = await TvSeries.readById(id)
          res.status(200).json(readOneSeries)
        }

      } else {
        readOneSeries = await TvSeries.readById(id)
        res.status(200).json(readOneSeries)
      }

    } catch (error) {
      res.status(500).json(error)
      
    }
  }
   
  static async update(req, res) {
    let id = req.params.id
    let tvSeriesUpdate = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }

    try {
      await redis.del("tvseries:allData")
      TvSeries.findIdandUpdate(id, tvSeriesUpdate)
      res.status(201).json({ message: "data updated"})
      
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async delete(req, res) {
    let id = req.params.id

    try {
      await redis.del("tvseries:allData")
      TvSeries.delete(id)
      res.status(200).json({message: 'data deleted'})
      
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = TvSeriesController