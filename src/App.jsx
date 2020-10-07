import React,{useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Header from "./components/templates/Header";
import Footer from "./components/templates/Footer";
import Form from "./components/pages/Form";
import SignIn from "./components/pages/SignIn";
import BookList from "./components/pages/BookList";
import BookDetail from "./components/pages/BookDetail"
import {AuthProvider} from "./store/authStore"
import LoggedInRoute from "./router/LoggedInRouter";
import { useDispatch, useSelector } from "react-redux";
import firebase from "./firebase/firebase"
import {BookAddAction} from "./reducks/books/actions"
import ReadForm from "./components/pages/ReadForm"



function App() {

    const books = useSelector((state) => state.books);
    const dispatch = useDispatch();
     useEffect(() => {
       firebase
         .firestore()
         .collection("books")
         .onSnapshot((snapshot) => {
           const books = snapshot.docs.map((doc) => {
             return doc.data();
           });
           dispatch(BookAddAction(books));
         });
     }, []);


  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          {/* <Switch>
            <Route exact path="/book/:id" component={BookDetail} />
            <Route exact path="/add" component={Form} />
            <Route exact path="/signIn" component={SignIn} />
            <LoggedInRoute exact path="/" component={BookList} />
            <Route exact path="/signUp" component={SignUp} />
          </Switch> */}
          <ReadForm />
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
