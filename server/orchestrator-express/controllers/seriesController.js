const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis()
const url = "http://localhost:4002/tvseries/"

class SeriesController{
  
  static async readAll(req, res) {
    try {
      const series = JSON.parse(await redis.get('series'))
      if (!series) {
        const { data } = await axios.get(url)
        res.status(200).json(data)
        redis.set("movies", JSON.stringify(data))
      }else {
        res.status(200).json(series)
      }
    } catch (error) {
      res.send(error)
    }
  }
  static async create(req, res) {
    try {
      await redis.del("series")
      await redis.del("entertainMe")
      const { data } = await axios.post(url, {
        ...req.body,
      });
      res.status(201).json(data);

    } catch (error) {
      res.send(error)
    }
  }
  static async readOne(req, res) {
    try {
      const seriesId = req.params.id;
      const series = JSON.parse(await redis.get("series"));
      if (movies) {
        const seri = series.filter((movie) => movie._id === seriesId);
        if (seri) {
          res.status(200).json(seri);
        } else {
          const { data } = await axios.get(`${url}${id}`);
          res.status(200).json(data);
        }
      } else {
        const { data } = await axios.get(`${url}${id}`);
        res.status(200).json(data);
      }
    } catch (error) {
      res.send(error);
    }
  }
  static async update(req, res) {
    try {
      await redis.del("series")
      await redis.del("entertainMe")
      const seriesId = req.params.id
      const { data } = await axios.put(`${url}${seriesId}`, {
        ...req.body,
      });
      res.status(201).json(data);

    } catch (error) {
      res.send(error); 
    }
  }
  static async delete(req, res) {
    try {
      await redis.del("series")
      await redis.del("entertainMe")
      const seriesId = req.params.id
      const { data } = await axios.delete(`${url}${seriesId}`)
      res.status(200).json({message: 'data series deleted'});
      
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = SeriesController
