import React from 'react';
import App from './App';
import RelatedImages from './components/RelatedImages';
import SearchComponent from './components/SearchComponent';

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
      <Route  path="/search" element={<SearchComponent />}>
      </Route>
      <Route path="/images/:author" element={<RelatedImages />}>
      </Route>
    </Routes>
  </BrowserRouter>
);

