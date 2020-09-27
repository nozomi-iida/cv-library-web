import React from 'react';
import SignUp from './components/pages/SignUp';
import Header from "./components/templates/Header"
import Footer from "./components/templates/Footer"
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
