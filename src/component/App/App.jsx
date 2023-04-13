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
import Error404 from '../Error/Error404';
import CreateCard from '../CreateCard/CreateCard';

import { useDispatch } from 'react-redux';
import { actionlogin } from "../../actions/user";
import { fetchCards} from '../../actions/card';
import { fetchComments} from '../../actions/comment';
import { useEffect } from 'react';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
       await dispatch(fetchCards());
       await dispatch(fetchComments());

    };
    fetchData();

    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");
    const pseudo = sessionStorage.getItem("pseudo");
    const  userId= sessionStorage.getItem("id");

    if(email && role && pseudo && userId) {
      dispatch(actionlogin(email,role,pseudo,userId))
      console.log(pseudo);
    }
 
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
          <Route path='*' element={(<Error404 />)} />
        
        </Routes>
        
      </div>
  )
}


export default App;