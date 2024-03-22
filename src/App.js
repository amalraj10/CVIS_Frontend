
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './Pages/LoginForm';
import SignupForm from './Pages/SignupForm';
import Home from './Pages/Home';
import Register from './Pages/Register';
import { useContext } from 'react';
import { isHomeContext } from './context/ContextShare';
import Details from './Pages/Details';

function App() {
  const {isHomeToken,setIsHomeToken} = useContext(isHomeContext)

  return (
    <div>
       <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        <Route path='/home' element={isHomeToken?<Home/>:<LoginForm/>}/>
        <Route path='/form' element={<Register/>}/>
        <Route path='/details' element={<Details/>}/>
</Routes>

    </div>
  );
}

export default App;
