import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Header from "./components/templates/Header";
import Footer from "./components/templates/Footer";
import Form from "./components/pages/Form";
import SignIn from "./components/pages/SignIn";
import BookList from "./components/pages/BookList";
import BookDetail from "./components/pages/BookDetail";
import {AuthProvider} from "./store/authStore"
import LoggedInRoute from "./router/LoggedInRouter";
function App() {
  return (
    <div className="App">
      <Header />
      <AuthProvider>
      <Router>
        <Switch>
          <LoggedInRoute exact path="/" component={BookList} />
          <Route exact path="/book" component={BookDetail} />
          <Route exact path="/add" component={Form} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
        </Switch>
      </Router>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
