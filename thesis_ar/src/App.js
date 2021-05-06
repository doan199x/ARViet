import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home.js";

import { UserProvider } from "../src/context/UserContext.jsx";
import Signin from "./pages/Sign in/Signin.js";
import Signup from "./pages/Sign up/Signup.js";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import Create from "./pages/Lecture/Create/Create.js";


function App() {
  return (
    <Router>
      <Header/>
       <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
      </Switch>
      <Switch>
        <Route path="/signup">
          <Signup/>
        </Route>
      </Switch>
      <UserProvider>
      <Switch>
        <Route path="/lecture/create">
          <Create/>
        </Route>
      </Switch>
      </UserProvider>
      <Footer/>
    </Router>
  );
}

export default App;
