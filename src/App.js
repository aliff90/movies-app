import React from "react";
import "firebase/database";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddMovies from "./component/AddMovies"
import MovieDashBoard from "./component/MovieDashBoard"
import EditMovie from "./component/EditMovie";
import "./component/style.css"
import Login from "./component/Login";
import { AuthProvider } from "./component/contexts/AuthContext";
import PrivateRoute from "./component/PrivateRoute"
// import "./component/styles/styles.scss"

const App = () => {
  return (
    
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/" exact={true} component={Login} />
          <PrivateRoute path="/dashboard"  component={MovieDashBoard}/>    
          <PrivateRoute path="/add" component={AddMovies} />    
          <PrivateRoute path="/edit/:id" component={EditMovie} />    
        </Switch>
        </AuthProvider>
    </Router>
    

  )
}

export default App;
