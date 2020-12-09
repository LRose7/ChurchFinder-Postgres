import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import Home from './screens/Home';
import Addchurch from './screens/Addchurch';
import churchMap from './screens/ChurchMap';

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/addchurch' component={Addchurch} />
          <Route path='/churchmap' component={churchMap} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
