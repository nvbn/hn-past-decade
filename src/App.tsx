import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardScreen from "./components/DashboardScreen";

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route children={<DashboardScreen />} />
    </Switch>
  </Router>
);

export default App;
