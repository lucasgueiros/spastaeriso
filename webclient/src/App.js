import './App.css';
import InputNavigator from './recipeBook/input/InputNavigator.js';
import Home from './navigation/Home.js';
import Header from './navigation/header/Header.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Switch>
          <Route path="/inputs">
            <InputNavigator/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
