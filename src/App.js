import React, { Component } from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import Movies from './components/sliModal';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faIgloo)
library.add(faPlusCircle)

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
        </div>
      </BrowserRouter>
    );
  }
}

const home = () => {
  return (
    <Homepage />
  )
}

const movies = () => {
  return (
    <Movies />
  )
}

export default App;
