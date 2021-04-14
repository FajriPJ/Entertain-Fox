import '../App.css'
import React from 'react'
import Swal from 'sweetalert2'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { favoritesVar } from '../config/vars'
import { GET_ALLDATA, REMOVE_MOVIE } from '../queries'


// const REMOVE_MOVIE = gql`
//   mutation removeMovie($movieId: ID) {
//     deleteMovie( _id: $movieId){
//       message
//     }
//   }
// `

export default function Home() {
  
  const history = useHistory()

  const {data: getmovies, loading:loadmovies, error: errmovies} = useQuery(GET_ALLDATA)
  const {data: getseries, loading:loadseries, error: errseries} = useQuery(GET_ALLDATA)
  const [deleteMovie, {data: delMovie, loading:loaddelmovie, error: errdelmovie}] = useMutation(REMOVE_MOVIE, {
    refetchQueries: [
      {query: GET_ALLDATA}
    ]
  })  

  const toEditPage = (id) => {
    console.log(id);
    history.push(`/EditMovie/${id}`)
  }

  const addToFavorite = (movie) => {

    const existingFavorites = favoritesVar()
    const newData = existingFavorites.concat(movie)
    favoritesVar(newData)
  }

  const onDelete = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
          deleteMovie({ 
            variables: {
              movieId: id
            }
          }),
          )
      }
    })
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
    <div className="mx-4 mt-3"> 
      <h2>Movies List</h2> 
      <div className=" cardMovie row mt-3 " >
        {
          getmovies.movies.map(movie => {
            return (
              <div  
                className=" col-md-2 mt-4" key={movie._id}>
                <div
                  className="moviecard card h-100 shadow" style={{borderRadius: "10px", backgroundColor: "black"}}>
                  <img

                    style={{borderRadius: "10px", backgroundColor: 'black'}}
                    src={movie.poster_path} />
                    <div className="overlay">
                      <button 
                        onClick={() => toEditPage(movie._id)}
                        className="btn-warning btn btn-i"><i className="icon bi bi-pencil-square"></i></button>
                      <button 
                        onClick={() => onDelete(movie._id)}
                        className="btn-danger btn btn-i"><i className="icon bi bi-trash-fill"></i></button>
                      <button 
                        onClick={() => addToFavorite(movie)}
                        className="btn-info btn btn-i"><i className="icon bi bi-heart-fill"></i></button>
                        
                    </div>
                    <div
                      style={{position: "relative", minHeight:"130px"}} 
                      className="card-body">
                      <h5 
                        className="titleMovie card-title"
                        >{movie.title}
                      </h5>
                        
                      <h5 className="card-title" style={{position: "absolute", bottom: "10px"}}><i  class="bi bi-star-fill" style={{color: "#ebd510"}}></i> {movie.popularity}</h5>
                      {/* <p className="card-title">{movie.overview}</p> */}
                    </div>
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
                  <img src={seri.poster_path} className="card-img-top"/>
                    <div className="card-body">
                    <h3 className="card-title">{seri.title}</h3>
                        
                      <h4 className="card-title"><i className="bi bi-star-fill" style={{color: "#ebd510"}}></i> {seri.popularity}</h4>
                      <p className="card-title">{seri.overview}</p>
                      <h4 className="card-title">Tags: {seri.tags}</h4>
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
