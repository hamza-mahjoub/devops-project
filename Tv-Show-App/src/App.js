import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TvSearchPage } from "./app/components/search-page/TvSearchPage";
import { MovieSearchPage } from "./app/components/search-page/MoviesSearchPage";
import { NavBar } from "./app/components/nav-bar/NavBar";
import { MovieDetailsPage } from "./app/components/show-details/MoviesDetailsPage";
import { TvDetailsPage } from "./app/components/show-details/TvDetailsPage";
import { NotFoundComponent } from "./app/components/shared/NotFoundComponent";

import "./App.css";
import { HomePage } from "./app/components/home-page/HomePage";

function App() {
  return (
    <Router>
      <div>
        <NavBar></NavBar>
        <Routes>
          <Route path="/search-page/tvs" element={<TvSearchPage />} />
          <Route path="/search-page/movies" element={<MovieSearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/tv-show/:id" exact={true} element={<TvDetailsPage />} />
          <Route path="/" exact={true} element={<HomePage />} />
          <Route path="*" exact={true} element={<NotFoundComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
