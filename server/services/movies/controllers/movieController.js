const Movie = require('../models/movieModels')
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis()
const url = "http://localhost:4001/movies/"


class MovieController{

  static  async read(req, res) {
    // Movie.readAll()
    //   .then(data => {
    //     res.status(200).json(data)
    //   })
    //   .catch(err => {
    //     res.status(500).json({message: "internal server error"})
    //   })  

    try {
      const movies = JSON.parse(await redis.get('movies:alldata'))

      if (!movies) {

        const readAllMovie = await Movie.readAll()
        redis.set('movies:alldata', JSON.stringify(readAllMovie))
        res.status(200).json(readAllMovie)

      } else {
        res.status(200).json(movies)
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
    // Movie.create(newMovie) 
    //   .then(data => {
    //     redis.del("movies:readAll")
    //     res.status(201).json(data.ops[0])
    //   })
    //   .catch(err => {
    //     res.status(500).json({message: "internal server error"})
    //   })

    try {
      await redis.del('movies:alldata')
      const newMovie = await Movie.create(input)
      res.status(201).json(newMovie.ops[0]);

    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async readOne(req, res) {

    let id = req.params.id

    // Movie.readById(id)
    //   .then(data => {
    //     console.log(data);
    //     res.status(200).json(data)
    //   })
    //   .catch(err => {
    //     res.status(500).json({message: "internal server error"})
    //   })

    try {
      const redisMovies = JSON.parse( await redis.get("movies:allData"))
      let readOneMovie;

      if (redisMovies) {
        console.log('asuuuu');
        const movie = redisMovies.filter((movie) => movie._id === id)

        if (movie){
          res.status(200).json(movie)
        } else {
          readOneMovie = await Movie.readById(id)
          res.status(200).json(readOneMovie)
        }

      } else {
        readOneMovie = await Movie.readById(id)
        res.status(200).json(readOneMovie)
      }

    } catch (error) {
      res.status(500).json(error)
      
    }
  }
  
  static async update(req, res) {
    let id = req.params.id
    let movieUpdate = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }

    // Movie.findIdandUpdate(id, movieUpdate)
    //   .then(data => {
    //     console.log('berhasil update');
    //     // res.status(201).json(data)
    //     res.status(201).json({message: "data updated"})

    //   })
    //   .catch(err => {
    //     res.status(500).json({message: "internal server error"})
    //   })

    try {
      await redis.del("movies:allData")
      Movie.findIdandUpdate(id, movieUpdate)
      res.status(201).json({ message: "data updated"})
      
    } catch (error) {
      res.status(500).json(error)
      
    }
  }

  static async delete(req, res) {
    let id = req.params.id

    // Movie.delete(id)
    //   .then(data => {
    //     res.status(200).json({message: 'data deleted'})
    //   })
    //   .catch(err => {
    //     res.status(500).json({message: "internal server error"})
    //   })

    try {
      await redis.del("movies:allData")
      Movie.delete(id)
      res.status(200).json({message: 'data deleted'})
      
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = MovieController