import React, { Component } from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import Moviespage from './components/Movies/moviespage';
import TvShowsPage  from './components/Tv-Shows/tvShowspage';
import SearchPage from './components/search';
import ChangeUsername from './components/changeUsername';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle, faAlignJustify)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
            <Route path='/' exact render={() => {
              return home();
            }} />
            <Route path='/Movies' exact render={() => {
              return movies();
            }} />
            <Route path='/Tv-shows' exact render={() => {
              return tvShows();
            }} />
            <Route path='/Search' exact render={() => {
              return search();
            }} />
            <Route path='/User' exact render={() => {
              return user();
            }} />
        </div>
      </BrowserRouter>
    );
  }
}

const home = () => {
  return (
    <Homepage  />
  )
}

const movies = () => {
  return (
    <Moviespage />
  )
}

const tvShows = () => {
  return (
    <TvShowsPage />
  )
}

const search = () => {
  return (
    <SearchPage />
  )
}

const user = () => {
  return (
    <ChangeUsername />
  )
}


export default App;
