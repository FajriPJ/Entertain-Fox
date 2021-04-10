const { ApolloServer, gql } = require('apollo-server');
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`

type Movie {
  id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
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
  tvseries: [TvSeries]
}
`;

const resolvers = {

  Query: {
    
    movies: async () => {
      try {
        let movieRedis = await redis.get('movies')
        if (!movieRedis) {

          const { data } = await axios.get("http://localhost:4000/movies")

          redis.set('movies', JSON.stringify(data))
          console.log(data);
          return data
        } else {
          console.log('masuk else');
          console.log(movieRedis, '<<<<<<<<');
          return JSON.parse(movieRedis)
        }
      } catch (error) {
        return error
      }
    },
  },

  // Mutation: {
  //   createMovies
  // }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

