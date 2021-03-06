import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Header from "./components/templates/Header";
import Footer from "./components/templates/Footer";
import Form from "./components/pages/Form";
import SignIn from "./components/pages/SignIn";
import BookList from "./components/pages/BookList";
import BookDetail from "./components/pages/BookDetail";
import BookDescription from "./components/pages/BookDescription";
import EditForm from "./components/pages/EditForm";
import { AuthProvider } from "./store/authStore";
import LoggedInRoute from "./router/LoggedInRouter";
import { useDispatch,useSelector } from "react-redux";
import firebase from "./firebase/firebase";
import { BookAddAction } from "./reducks/books/actions";
import ReadForm from "./components/pages/ReadForm";

function App() {
  const books =useSelector((state)=>state.books)
  const dispatch = useDispatch();
  useEffect(() => {
    firebase
      .firestore()
      .collection("books")
      .onSnapshot((snapshot) => {
        const books = snapshot.docs.map((doc) => {
          return {
            documentId: doc.id,
            ...doc.data(),
          };
        });
        dispatch(BookAddAction(books));
      });
  }, [dispatch]);

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <div style={{paddingTop: 64}}>
            <Switch>
              {books.length&&(
                <Route
                  exact
                  path="/book/bookDitail/edit/:id"
                  component={EditForm}
                />
              )}
              {books.length&&(
                <Route exact path="/book/:id" component={BookDetail} />
                )}
                {books.length&&(
                <Route
                exact
                path="/book/:id/discription"
                component={BookDescription}
                />
                )}
                
              <LoggedInRoute exact path="/add" component={Form} />
              <Route exact path="/signIn" component={SignIn} />
              <Route exact path="/" component={BookList} />
              <Route exact path="/signUp" component={SignUp} />
              <Route exact path="/book/detail/:id" component={ReadForm} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
