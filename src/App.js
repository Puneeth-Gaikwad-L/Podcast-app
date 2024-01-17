import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import './Components/Header/header';
import SignUp from './pages/SignUp';
import Profile from './pages/profile';
import { ToastContainer } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/podcasts' element={<SignUp />} />
          <Route path='/CreatePodcast' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;