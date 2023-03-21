import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import News from '../News/News';
import Videos from '../Videos/Videos';
import ArtGallery from '../ArtGallery/ArtGallery';
import Internship from '../Internship/Internship';
import Organization from '../Organization/Organization';
import Contact from '../Contact/Contact';
import Dico from '../Dico/Dico';
import CreateCard from '../CreateCard/CreateCard';
import { useDispatch } from 'react-redux';
import { fetchCards} from '../../actions/card';
import { useEffect } from 'react';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards());
  }, []);
  return (

   

      <div>
        <Routes>
          <Route path='/' element={(<Home />)} />
          <Route path='/login' element={(<Login />)} />
          <Route path='/registration' element={(<Registration />)} />
          <Route path='/news' element={(<News />)} />
          <Route path='/videos' element={(<Videos />)} />
          <Route path='/art-gallery' element={(<ArtGallery />)} />
          <Route path='/internship' element={(<Internship />)} />
          <Route path='/organization' element={(<Organization/>)} />
          <Route path='/createCard' element ={(<CreateCard /> )} />
          <Route path='/contact' element={(<Contact />)} />
          <Route path='/dico' element={(<Dico />)} />
        </Routes>
      </div>
  )
}


export default App;