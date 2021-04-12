import React, {useState} from 'react'
import { useMutation, gql } from '@apollo/client'


const ADD_MOVIE = gql`
  mutation AddMovie($newTitle: title, $newOverview:  overview, $newPoster_path: poster_path, $newPopularity: popularity, $newTags: tags){
    createMovie(title: $newTitle, overview: $newOverview, poster_path: $newPoster_path, popularity: $newPopularity, tags: $newTags) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export default function AddMovie() {

  
  const [newMovie, setNewMovie] = useState({
    title: "",
    overview: "",
    poster: "",
    popularity: 0,
    tags: [],
  }) 

  const [addMovieSubmit, {data: addNewMovie, loading: addLoading, error: addError}] = useMutation(ADD_MOVIE)
  // console.log(addNewMovie, '<<<<<<<<<<<,');
  // console.log(addLoading, '<<<<<<<<<<<,');
  // console.log(ADD_MOVIE, '====================');

  const changeData = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
 
    addMovieSubmit({ 
      variables: {
        newTitle: newMovie.title,
        newOverview: newMovie.overview,
        newPoster_path: newMovie.poster,
        newPopularity: Number(newMovie.popularity),
        newTags: newMovie.tags,
      }
    })
    console.log(newMovie);
  }

  return (
    <div className="container">
      <div className="card mt-3 mb-5" style={{backgroundColor: "#202120"}}>
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
                name='poster'
                placeholder="poster"
                value={newMovie.poster}
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

// onSubmit={(e) => handleSubmit(e)}