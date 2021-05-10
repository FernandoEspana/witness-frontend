import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect 
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Activate from './pages/Activate/Activate';
import Station from './pages/Station/Station';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/home" component={ Dashboard } />
        <Route exact path="/auth/activate/:token" component={ Activate } />
        <Route exact path="/home/:stationId" component={ Station } />
        <Redirect from="*" to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
