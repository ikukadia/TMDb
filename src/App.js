import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import List from './components/list/list.jsx';
import Gallery from './components/gallery/gallery.jsx';
import Detail from './components/detail/detail.jsx';

require('./App.scss');

class App extends Component {
  render() {
    return (
      <div>
        <div className="nav">
          <h1 className="title">TMDb</h1>
          <Router>
            <div>
              <h2>
                <Link to="/" className="links">
                  <Icon name='search'></Icon>
                </Link>
                <Link to="/gallery" className="links">
                  <Icon name='images'></Icon>
                </Link>
              </h2>
            </div>
          </Router>
        </div>
        <Router>
          <Switch>
            <Route exact path='/' component={List} />,
            <Route exact path='/gallery' component={Gallery} />,
            <Route exact path='/detail' component={Detail} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
