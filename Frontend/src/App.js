import './App.css';
import Homepage from "./components/Homepage"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import {
  BrowserRouter as Router, 
  Routes, 
  Route

} 
from "react-router-dom";
import {useState} from 'react';
function App() {
  const [user,setLoginUser] = useState({

  })
  return (
    <div className="App">
      <Router>
<Routes>
  <Route exact path="/Homepage">
    {
      user && user._id ? <Homepage/>:<Signin/>
    }<homepage/></Route>
  <Route path="/Signin"><Signin setLoginUser={setLoginUser}/></Route>
  <Route path="/Signup"><Signup/></Route>
</Routes>

      </Router>

    </div>
  );
}

export default App;