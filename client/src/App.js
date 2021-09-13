import logo from './logo.svg';
import './sass/main.scss';
import {SignInForm } from './components';
import { ErrorPage, PrivateRoute, Dashboard, ManageLandingPage } from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

  
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h2>The main page</h2>
        </Route>
        <PrivateRoute exact path="/admin">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/manageLandingPage">
          <ManageLandingPage /> 
        </PrivateRoute>
        <Route exact path="/login">
          <SignInForm />
        </Route>
     
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
