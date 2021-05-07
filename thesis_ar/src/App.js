import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home.js";

import { UserProvider } from "../src/context/UserContext.jsx";
import Signin from "./pages/Sign in/Signin.js";
import Signup from "./pages/Sign up/Signup.js";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import Create from "./pages/Lecture/Create/Create.js";
import Lecture from "./pages/Lecture/Lecture.js";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact strict path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <UserProvider>
          <Switch>
            <Route exact path="/lecture">
              <Lecture />
            </Route>
            <Route exact path="/lecture/create">
              <Create />
            </Route>
            <Route>
              <h1>ERROR</h1>
            </Route>
          </Switch>
        </UserProvider>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
