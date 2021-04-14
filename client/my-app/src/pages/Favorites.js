import React from 'react'
import { useReactiveVar} from '@apollo/client'
import { favoritesVar } from '../config/vars'

export default function Favorites() {
  const favorites = useReactiveVar(favoritesVar)
  console.log(favorites);

  if ( !favorites.length ) {
    return (
      <div class="card">
        <div class="card-body">
          <h1>Belum memasukkan favorite</h1>
        </div>
      </div>
    )
  }
  return (
    <div>
    {
      favorites.map(fav => {
        return (
          <div class="container m-4" key={fav.id}>
            <div class="row">
              <div class="col-md-8">
                <div class="card">
                  <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                    <img src={fav.poster_path} style={{height: "200px", width: "220px"}} />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h3 className="card-title">{fav.title}</h3>
                        <h6>Actor: {fav.overview}</h6>
                        <h6>BirthDay: {fav.popularity}</h6>
                        <h6>Genre: {fav.tags} </h6>
                      </div>
                    </div>                    
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}
