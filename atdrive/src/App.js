import {BrowserRouter, Route, Switch} from 'react-router-dom'

import './App.css'
import Home from './screens/Home'
import Form from './screens/Form'
import NavBar from './components/NavBar'


const Routing = () => {

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/create">
        <Form />
      </Route>
      <Route path="/edit/:personId">
        <Form />
      </Route>
    </Switch>
  )
}


function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Routing />
    </BrowserRouter>
    
  );
}

export default App;
