import React from 'react';
import SignUp from './components/pages/SignUp';
import Header from "./components/templates/Header"
import Footer from "./components/templates/Footer"
import Form from "./components/pages/Form"
import SignIn from './components/pages/SignIn';
function App() {
  return (
    <div className="App">
      <Header/>
      <SignUp/>
      <Footer/>
    </div>
  );
}

export default App;
