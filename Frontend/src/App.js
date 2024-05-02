import './App.css';
import Main from './Components/Main';
import SignInSide from './Components/UserDetails';
import PageLoader from './Components/LoadingAnimations';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ResponsiveAppBar from './Components/TopAppBar';
import ShopLocation from './Components/MapShopLocation';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function App() {
  

  const { userDetailSuccess } = useSelector((state) => state.centerStore);
  console.log(userDetailSuccess);

  // useEffect(() =>{

  // },[userDetailSuccess])
  return (
    <Router>
      <ResponsiveAppBar />
      {/* <Link to="/map" target="_blank">map</Link> */}
    <Routes>
      <Route exact path="/" element={ userDetailSuccess ?  <Main /> :   <SignInSide />} />
      <Route path="/map" element={<ShopLocation />} />
    </Routes>
  </Router>

    // <div>
    // {
    //   userDetailSuccess ? 
    //   <Main /> :  
    //   <SignInSide />
    // }
    // {/* <ShopLocation /> */}
    // {/* <PageLoader /> */}
    // </div>

  );
}

export default App;

// npm i react-router-dom