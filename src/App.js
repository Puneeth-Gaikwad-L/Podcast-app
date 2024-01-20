import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './Components/common/Header/header';
import { auth, db } from './Firebase/firebase';
import SignUp from './pages/SignUp';
import { setUser } from './slice/userSlice';
import PrivateRoutes from './Components/common/PrivateRoutes/PrivateRoutes';
import CreatePodcast from './pages/CreatePodcast';
import Podcasts from './pages/Podcasts';
import Profile from './pages/profile';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: userData.uid,
                })
              );
            }
          },
          (error) => {
            console.error(error);
          }
        );

        return () => {
          unsubscribSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [])

  return (
    <div className='App'>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/podcasts' element={<Podcasts />} />
            <Route path='/CreatePodcast' element={<CreatePodcast />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;