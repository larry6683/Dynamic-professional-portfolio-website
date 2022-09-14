import logo from './logo.svg';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ResponsiveAppBar from './components/AppBar';
import HomePage from './components/Admin/HomePage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from './config';
import DynamicPages from './components/DynamicPages';
import AppBar from './components/AppBar'
import Drawer from  './components/Drawer'
import PageUpdater from './components/PageUpdater'





function App() {


  return (
    <div className="App">
{/* <HomePage /> */}
{/* {renderHTML(htmldata)} */}

<div style={{paddingBottom:'50px'}}>
<AppBar />

</div>


<Routes>
      <Route path="/:page" element={<DynamicPages />}>
        
        

        {/* <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
      </Route>
      <Route path="/" element={<DynamicPages />}></Route>
      <Route path="/add" element={<HomePage/>} />

      <Route path="/dashboard" element={<Drawer/>} />
      <Route path="/update/:page" element={<PageUpdater/>} />
    </Routes>

    </div>
  );
}

export default App;
