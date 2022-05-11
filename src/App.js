import './App.css';
import { useContext } from 'react';

// Route
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes';


// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ItemDetails from './pages/ItemDetails';

import { GlobalContext } from "./Store/Globalstate";

function App() {
  const { state } = useContext(GlobalContext);
  return (

    <div className="App"> 
        <Router>
          <Routes>
            <Route path="/" element={state.isLogin ? <Navigate replace to="/dashboard" /> : <Navigate replace to="/login" />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/dashboard" exact element={<PrivateRoutes component={Dashboard} />} />
            <Route path="/item-details/:itemId" exact element={<PrivateRoutes component={ItemDetails} />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
