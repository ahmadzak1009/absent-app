import React, { setGlobal } from "reactn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

setGlobal({
  user: null
});

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <PrivateRoute>
            <Route path="/dashboard" component={Dashboard} />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
