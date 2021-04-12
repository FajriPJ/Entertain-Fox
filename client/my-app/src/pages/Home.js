import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { useHistory } from 'react-router-dom'

const GET_ALLDATA = gql`
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

export default function Home() {
  
  const history = useHistory()

  const {data: getmovies, loading:loadmovies, error: errmovies} = useQuery(GET_ALLDATA)
  const {data: getseries, loading:loadseries, error: errseries} = useQuery(GET_ALLDATA)

  const toAddMovie = () => {
    history.push('/AddMovie')
  }

  const toDetail = (id) => {
    console.log(id);
    history.push(`/MovieDetail/${id}`)
  }

  if ( loadmovies ) {
    return (
      <h1>Loading...</h1>
    )
  }
  if ( loadseries ) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className="mx-3 mt-3"> 
      <button type="button" className="btn btn-primary" onClick={() => toAddMovie()}>Add Movie</button>
      <h2>Movies List</h2> 
      <div className="row mt-3">
        {
          getmovies.movies.map(movie => {
            return (
              <div className="col-md-2" key={movie._id}>
                <div className="card h-100">
                  {/* <img src="..." className="card-img-top" alt="..."> */}
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">This card has supporting text below as a natural lead-in to additional content. </p>
                    </div>
                      <button className="btn-warning btn" onClick={() => toDetail(movie._id)}>detail</button>
                </div>
              </div>
            )
          })
        }
      </div>

      <h2 className="mt-5">TV Series List</h2>
      <div className="row mt-3 mb-5">
        {
          getseries.series.map(seri => {
            return (
              <div className="col-md-2" key={seri._id}>
                <div className="card h-100">
                  {/* <img src="..." className="card-img-top" alt="..."> */}
                    <div className="card-body">
                      <h5 className="card-title">{seri.title}</h5>
                      <p className="card-text">This card has supporting text below as a natural lead-in to additional content. </p>
                    </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
