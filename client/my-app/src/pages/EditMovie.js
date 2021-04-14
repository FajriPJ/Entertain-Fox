import React, { useState, useEffect } from 'react'
import {useQuery, gql, useMutation} from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'

const GET_ONEDATA = gql`
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

const UPDATE_MOVIE = gql`
mutation UpdateMovie($updatemutation: MovieInput) {
  updateMovie(updateMovie: $updatemutation){
    message
  }
}
`

export default function EditMovie() {
  const history = useHistory()

  const [movieUpdate, setMovieUpdate] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: [],
  })

  const {id} = useParams()

  const {data, loading, error} = useQuery(GET_ONEDATA, {variables: {movieId: id}})


  const [updateMovieSubmit, { data: updateMovieData, loading: loadUpdate, error: errUpdate}] = useMutation(UPDATE_MOVIE)

  useEffect(() => {
    if ( data ) {
      let obj = {
        _id: data.movie._id,
        title: data.movie.title,
        overview: data.movie.overview,
        poster_path: data.movie.poster_path,
        popularity: +data.movie.popularity,
        tags: data.movie.tags
        }
      setMovieUpdate(obj)
      
      console.log(data);
    } 
  }, [data])

  const onSubmit = (e) => {
    e.preventDefault()
    updateMovieSubmit({
      variables: {
        updatemutation: {
          ...movieUpdate,
        }
      }
    })
    history.push('/')
  }
  
  const changeData = (e) => {
    e.preventDefault()
    
    setMovieUpdate({
      ...movieUpdate,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container">
      <h2>Update Movie</h2>
      <div className="card mt-3 mb-5" >
        <div className="card-body">
          <form onSubmit={onSubmit} >
            <div className="mb-3">
              <label className="form-label">Movie Title</label>
              <input 
                className="form-control" 
                placeholder="movie title"
                name='title'
                value={movieUpdate.title}
                onChange={changeData}
                />
            </div>
            <div className="mb-3">
              <label className="form-label">Overview</label>
              <textarea 
                name='overview'
                placeholder="overview"
                value={movieUpdate.overview}
                onChange={changeData}
                className="form-control">
              </textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Poster</label>
              <input 
                name='poster_path'
                placeholder="poster"
                value={movieUpdate.poster_path}
                onChange={changeData}

                className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Popularity</label>
              <input 
                name='popularity'
                placeholder="popularity"
                value={movieUpdate.popularity}
                onChange={changeData}
                type="number" 
                className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Tags</label>
              <input
                name='tags'
                placeholder="tags"
                value={movieUpdate.tags}
                onChange={changeData} 
                className="form-control"
                 />
            </div>
            <button className="btn btn-primary">Update Movie</button>
          </form>
        </div>
      </div>
    </div>
  )
}

