import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home.js";

import { UserProvider } from "../src/context/UserContext.jsx";
import { Userprotect } from "../src/context/Userprotect.jsx";
import Signin from "./pages/Sign in/Signin.js";
import Signup from "./pages/Sign up/Signup.js";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import Create from "./pages/Lecture/Create/Create.js";
import { useContext } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Error from "./pages/Error/Error.js";
import LectureList from "./pages/Lecture/LectureList.js";
import Guide from "./pages/Guide/Guide.js";

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
            <Userprotect>
              <Switch>
                <Route exact path="/lecture">
                  <LectureList/>
                </Route>
                <Route exact path="/lecture/:lecid">
                  <Create />
                </Route>
                <Route exact path="/guide">
                  <Guide/>
                </Route>
                <Route>
                  <Error />
                </Route>
              </Switch>
            </Userprotect>
          </Switch>
        </UserProvider>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
