
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import Series from './pages/Series'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Favorite from './pages/Favorites'


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
              <span className="logo">

                <Link to='/'  className=" m-2"> 
                  EntertainMe
                </Link>
              </span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav mx-3">
                {/* <Link to='/'  className="m-2"> 
                Home
                </Link> */}
                <Link to='/AddMovie' className="m-2"> 
                  Add Movie
                </Link>
                <Link to='/Favorite' className="m-2"> 
                  Favorite
                </Link>
              </div>
            </div>
          </div>
        </nav>
  
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/MovieDetail/:id">
            <MovieDetail />
          </Route> */}
          <Route path="/EditMovie/:id">
            <EditMovie />
          </Route>
          <Route path="/AddMovie">
            <AddMovie />
          </Route>
          <Route path="/Series">
            <Series />
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
