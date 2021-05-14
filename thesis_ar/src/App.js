import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home.js";

import { UserProvider } from "../src/context/UserContext.jsx";
import { Userprotect } from "../src/context/Userprotect.jsx";
import Signin from "./pages/Sign in/Signin.js";
import Signup from "./pages/Sign up/Signup.js";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import Create from "./pages/Lecture/Create/Create.js";
import Lecture from "./pages/Lecture/Lecture.js";
import { useContext } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Error from "./pages/Error/Error.js";

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
  //mat tieu cai app rui
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserProvider>
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
            <Switch>
              <Route exact path="/lecture">
                <Lecture />
              </Route>
              <Route exact path="/lecture/create">
                <Create />
              </Route>
              <Route>
                <Error />
              </Route>
            </Switch>
          </Switch>
        </UserProvider>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
