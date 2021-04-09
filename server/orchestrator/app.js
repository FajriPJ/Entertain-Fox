const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`

type Movie {
  id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Int
  tags: [String]
}

type TvSeries {
  id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Int
  tags: [String]
}

type Query {
  movies: Movie
  tvseries: [TvSeries]
}

`;

const resolvers = {
  Query: {
    movies: () => {
      return axios({
        method: "GET",
        url: 'http://localhost:4001/movies'
      })
      .then(({data}) => {
        console.log('masuk');
        return data
      })
      .catch( err => {
        throw err
      })
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

