import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/header/Header';
import PostUser from './pages/eleves/PostUser';
import Dashboard from './pages/dashboard/Dashboard';
import Septieme from './pages/classes/septieme/Septieme';
import Huitieme from './pages/classes/huitieme/Huitieme';




function App() {
  return (
    <>
      <Header /> 
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/eleves' element={<PostUser/>}></Route>
        <Route path='/septieme' element={<Septieme/>}></Route>
        <Route path='/huitieme' element={<Huitieme/>}></Route>
       
      </Routes>
    </>
  );
}

export default App;
