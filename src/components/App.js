
import Login from "./Login";
import Register from "./Register"

import {BrowserRouter, Route, Switch, Redirect, Link, NavLink} from 'react-router-dom';


function App() {
  return (
    <div className="App">
       <div>
                   <BrowserRouter>
                        <Link to = "/login">Login</Link>
                        <Link to = "/register">Register</Link>
                        <Switch>
                            <Route path = "/login" exact component = {Login}/>
                            <Route path = "/register" exact component = {Register}/>
                        </Switch>
                        
                   </BrowserRouter>
               </div>
    </div>
  );
}

export default App;
