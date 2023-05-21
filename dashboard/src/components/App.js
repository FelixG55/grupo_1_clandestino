import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoriesInDB from './CategoriesInDb';
import Home from './Home';
import ContentWrapper from './ContentWrapper';
import LastProductDB from './LastProductDB';

function App() {
  return (
    <React.Fragment>
      	<div id="wrapper">
          <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/pages' element={<CategoriesInDB/>}/>
           <Route path='/contentWrapper' element={<ContentWrapper/>}/>
           <Route path='/LastProductDB' element={<LastProductDB/>}/>
           {/* <Route path='/lastMovie' element={<LastProductDB/>}/>  */}

          </Routes>
        </div>
    </React.Fragment>
  );
}

export default App;
