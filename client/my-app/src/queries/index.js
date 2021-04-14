
import { gql } from '@apollo/client'


export const GET_ALLDATA = gql`
  query GetMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    },

    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    },
  }
`

export const ADD_MOVIE = gql`
  mutation AddMovie($newMoviemutation: MovieInput) {
    createMovie(newMovie: $newMoviemutation){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const GET_ONEDATA = gql`
  query getMovie($movieId: ID!) {
    movie(_id: $movieId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const UPDATE_MOVIE = gql`
mutation UpdateMovie($updatemutation: MovieInput) {
  updateMovie(updateMovie: $updatemutation){
    message
  }
}
`

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: ID) {
    deleteMovie( _id: $movieId){
      message
    }
  }
`