import React, {useState} from 'react'
import { useMutation, gql } from '@apollo/client'
import {useHistory} from 'react-router-dom'
import {ADD_MOVIE, GET_ALLDATA} from '../queries'
import Swal from 'sweetalert2'


export default function AddMovie() {

  const history = useHistory()

  const [newMovie, setNewMovie] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: [],
  }) 

  const [addMovieSubmit, {data: addNewMovie, loading: addLoading, error: addError}] = useMutation(ADD_MOVIE, {
    refetchQueries: [
      {query: GET_ALLDATA}
    ]
  })

  const changeData = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'adding movie success'
    })
    addMovieSubmit({ 
      variables: {
        newMoviemutation: {
          ...newMovie, 
          popularity: parseFloat(newMovie.popularity)

        }
      }
    })
    history.push('/')
  }

  if (addLoading) {
    return (
      <h2>Loading...</h2>
    )
  }
  if (addError) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div className="container">
      <h2>Add Movie</h2>
      <div className="card mt-3 mb-5" >
        <div className="card-body">
          <form onSubmit={onSubmit} >
            <div className="mb-3">
              <label className="form-label">Movie Title</label>
              <input 
                className="form-control" 
                placeholder="movie title"
                name='title'
                value={newMovie.title}
                onChange={changeData}
                />
            </div>
            <div className="mb-3">
              <label className="form-label">Overview</label>
              <textarea 
                name='overview'
                placeholder="overview"
                value={newMovie.overview}
                onChange={changeData}
                className="form-control">
              </textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Poster</label>
              <input 
                name='poster_path'
                placeholder="poster"
                value={newMovie.poster_path}
                onChange={changeData}

                className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Popularity</label>
              <input 
                name='popularity'
                placeholder="popularity"
                value={newMovie.popularity}
                onChange={changeData}
                type="number" 
                className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Tags</label>
              <input
                name='tags'
                placeholder="tags"
                value={newMovie.tags}
                onChange={changeData} 
                className="form-control"
                 />
            </div>
            <button className="btn btn-primary">create movie</button>
          </form>
        </div>
      </div>
    </div>
  )
}
