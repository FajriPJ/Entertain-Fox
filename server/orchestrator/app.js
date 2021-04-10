const { ApolloServer, gql } = require('apollo-server');
const axios = require("axios");
const Redis = require("ioredis");
const { update } = require('../orchestrator-express/controllers/moviesController');
const redis = new Redis();
const movieURL = "http://localhost:4001/movies/"

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

  type TvSeries {
    id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    movie(_id: ID): Movie
    tvseries: [TvSeries]
  }

  type Mutation {
    createMovie(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : Movie
    updateMovie(_id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : MovieMessage
    deleteMovie(_id: ID): MovieMessage
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
        let movieOneRedis = await redis.get('movies:onedata')
        if (!movieOneRedis) {

          const { data } = await axios.get(`http://localhost:4001/movies/${_id}`)

          redis.set('movies:onedata', JSON.stringify(data))
          return data
        } else {
          return JSON.parse(movieOneRedis)
        }
      } catch (error) {
        console.log(error, '========');
      }
    }
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
        return data
      } catch (error) {

        return error
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

