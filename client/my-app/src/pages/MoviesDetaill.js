import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_ONEMOVIE= gql`
  query GetMovies($movieId: ID){
    movie(_id: movieId){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export default function Movies() {

  // const {data, loading, error} = useQuery(GET_ONEMOVIE, {
  //   variables: {
  //     movieId: movieId,
  //   }    
  // })

  // if (loading) {
  //   return (
  //     <h1>Loading...</h1>
  //   )
  // }
  

  return (
    <div className="mx-3 mt-3">
      <h2>ini halaman detail</h2> 
    </div>
  )
}
