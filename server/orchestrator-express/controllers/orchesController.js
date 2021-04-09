const axios = require('axios');
const Redis = require("ioredis")
const redis = new Redis()

class OrchesController{
  
  static async readAll(req, res){

    try {
      const entertainMe = await redis.get('entertainMe:data')

      if (!entertainMe) {

        const movies = axios.get('http://localhost:4001/movies') 
        const series = axios.get('http://localhost:4002/tvseries')

          Promise.all([movies, series]).
          then((data)=>{
            const movie = data[0].data
            const series = data[1].data

            redis.set('entertainMe:data',JSON.stringify({movie, series}))
            res.status(200).json(data)
          })  

      } else {
        console.log('ini dari redis')
        res.status(200).json(JSON.parse(entertainMe))
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'internal server error'})
    }
  }
}

module.exports = OrchesController