import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
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
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/home" component={ Dashboard } />
          <Route exact path="/auth/activate/:token" component={ Activate } />
          <Route exact path="/home/:stationId" component={ Station } />
          <Redirect from="*" to="/" />
        </Switch>  
      </Router>
    </Provider>
    
  );
}

export default App;
