
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import Series from './pages/Series'
import MovieDetail from './pages/MoviesDetaill'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Favorite from './pages/Favorites'


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
              <Link to='/'  className="m-2"> 
                EntertainMe
              </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav mx-3">
                {/* <Link to='/'  className="m-2"> 
                Home
                </Link> */}
                <Link to='/Series' className="m-2"> 
                TV Series
                </Link>
                <Link to='/Favorite' className="m-2"> 
                Favorite
                </Link>
                {/* <Link to='/Movies' className="m-2"> 
                Movies
                </Link> */}
              </div>
            </div>
          </div>
        </nav>
  
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/MovieDetail/:id">
            <MovieDetail />
          </Route>
          <Route path="/Series">
            <Series />
          </Route>
          <Route path="/AddMovie">
            <AddMovie />
          </Route>
          <Route path="/EditMovie">
            <AddMovie />
          </Route>
          <Route path="/Favorite">
            <Favorite />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
