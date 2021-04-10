const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis()
const url = "http://localhost:4001/movies/"

class MoviesController{
  
  static async readAll(req, res) {
    try {
      const movies = JSON.parse(await redis.get('movies'))
      if (!movies) {
        const { data } = await axios.get(url)
        res.status(200).json(data)
        redis.set("movies", JSON.stringify(data))
      }else {
        res.status(200).json(movies)
      }
    } catch (error) {
      res.send(error)
    }
  }
  static async create(req, res) {
    try {
      await redis.del("movies")
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
      const movieId = req.params.id;
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        const movie = movies.filter((movie) => movie._id === movieId);
        if (movie) {
          res.status(200).json(movie);
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
      await redis.del("movies")
      await redis.del("entertainMe")
      const movieId = req.params.id
      const { data } = await axios.put(`${url}${movieId}`, {
        ...req.body,
      });
      res.status(201).json(data);

    } catch (error) {
      res.send(error); 
    }
  }
  static async delete(req, res) {
    try {
      await redis.del("movies")
      await redis.del("entertainMe")
      const movieId = req.params.id
      const { data } = await axios.delete(`${url}${movieId}`)
      res.status(200).json({message: 'data movie deleted'});
      
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = MoviesController
