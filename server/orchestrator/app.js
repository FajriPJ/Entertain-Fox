const { ApolloServer, gql } = require('apollo-server');
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const movieURL = "http://localhost:4001/movies/"
const seriesURL = "http://localhost:4002/tvseries/"

const typeDefs = gql`

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MovieMessage {
    message: String
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String] 
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type SeriesMessage {
    message: String
  }

  input SeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String] 
  }

  type Query {
    movies: [Movie]
    movie(_id: ID): Movie
    series: [Series]
    seri(_id: ID) : Series
  }

  type Mutation {
    createMovie(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : Movie
    updateMovie(_id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : MovieMessage
    deleteMovie(_id: ID): MovieMessage

    createSeries(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : Series
    updateSeries(_id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : SeriesMessage
    deleteSeries(_id: ID): SeriesMessage
  }
`;

const resolvers = {

  Query: {
    
    movies: async () => {
      try {
        let movieRedis = await redis.get('movies:alldata')
        if (!movieRedis) {

          const { data } = await axios.get(movieURL)

          redis.set('movies:alldata', JSON.stringify(data))
          return data
        } else {
          return JSON.parse(movieRedis)
        }
      } catch (error) {
        return error
      }
    },

    movie: async (_, args) => {
      const {_id} = args
      try {
        let movieOneRedis = await redis.get(`movies:onedata${_id}`)
        if (!movieOneRedis) {

          const { data } = await axios.get(`${movieURL}${_id}`)

          redis.set(`movies:onedata${_id}`, JSON.stringify(data))
          return data
        } else {
          return JSON.parse(movieOneRedis)
        }
      } catch (error) {
        console.log(error, '========');
      }
    }, 

    series: async () => {
      try {
        let seriesRedis = await redis.get('series:alldata')
        if (!seriesRedis) {

          const { data } = await axios.get(seriesURL)

          redis.set('series:alldata', JSON.stringify(data))
          return data
        } else {
          return JSON.parse(seriesRedis)
        }
      } catch (error) {
        return error
      }
    },

    seri: async (_, args) => {
      const {_id} = args
      try {
        let seriesOneRedis = await redis.get(`series:onedata${_id}`)
        if (!seriesOneRedis) {

          const { data } = await axios.get(`${seriesURL}${_id}`)

          redis.set(`series:onedata${_id}`, JSON.stringify(data))
          return data
        } else {
          return JSON.parse(seriesOneRedis)
        }
      } catch (error) {
        console.log(error, '========');
        return error
      }
    },
  },

  Mutation: {
    createMovie: async (_, args) => {
      try {
        const newMovie = {
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags: args.tags,
        }

        redis.del("movies:alldata")
        const { data } = await axios.post(movieURL, {...newMovie});
        return data

      } catch (error) {
        return error
      }
    },

    createSeries: async (_, args) => {
      try {
        const newSeries = {
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags: args.tags,
        }
        redis.del("series:alldata")
        const { data } = await axios.post(seriesURL, {...newSeries});
        return data
      } catch (error) {
        return error
      }
    },

    updateMovie: async(_, args) => {
      const {_id} = args
      const updateMovie = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      }
      try {
        const { data } = await axios.put(`${movieURL}${_id}`, {...updateMovie})
        redis.del("movies:alldata")
        redis.del(`movies:onedata${_id}`)        
        return data
      } catch (error) {
        return error
      }
    },

    updateSeries: async(_, args) => {
      const {_id} = args
      const updateSeries = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      }
      try {
        const { data } = await axios.put(`${seriesURL}${_id}`, {...updateSeries})
        redis.del("movies:alldata")
        redis.del(`movies:onedata${_id}`)        
        return data
      } catch (error) {
        return error
      }
    },

    deleteMovie: async(_, args) => {
      try {
        const {_id} = args
        const {data} = await axios.delete(`${movieURL}${_id}`)
        redis.del("movies:alldata")
        redis.del(`movies:onedata${_id}`)
        return data
      } catch (error) {

        return error
      }
    },
    deleteSeries: async(_, args) => {
      try {
        const {_id} = args
        const {data} = await axios.delete(`${seriesURL}${_id}`)
        redis.del("series:alldata")
        redis.del(`series:onedata${_id}`)
        return data
      } catch (error) {

        return error
      }
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

