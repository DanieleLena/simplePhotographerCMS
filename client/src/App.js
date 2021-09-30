import logo from "./logo.svg";
import "./sass/main.scss";
import { SignInForm, Navbar } from "./components";
import {
  ErrorPage,
  PrivateRoute,
  Dashboard,
  ManageLandingPage,
  ManageContact,
  ManageLayout,
  ManageProjects,
  LandingPage,
  Projects,
  Contact,
  SingleProject
} from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route exact path="/projects/:id" children={<SingleProject/>}></Route>
        <Route exact path="/contact">
          <Contact />
        </Route>

        {/* PRIVATE ROUTES ADMIN ==================================== */}
        <PrivateRoute exact path="/admin">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/manageLandingPage">
          <ManageLandingPage />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/manageProjects">
          <ManageProjects />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/manageLayout">
          <ManageLayout />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/manageContact">
          <ManageContact />
        </PrivateRoute>
        {/* PRIVATE ROUTES ADMIN ==================================== */}
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
