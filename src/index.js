import React from 'react';
import App from './App';
import AuthorSearch from './components/AuthorSearch';
import KeywordSearch from './components/KeywordSearch';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
      </Route>
      <Route path="/search" element={<AuthorSearch />}>
      </Route>
      <Route path="/keyword-search" element={<KeywordSearch />}>
      </Route>
    </Routes>
  </BrowserRouter>
);

