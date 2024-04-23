import { useEffect } from "react";
import { useDispatch } from "react-redux";

import FetchMovie from "../actions/movieAction";
import FetchSeries from "../actions/serieAction";
import Rows from "../components/Rows";

import Nav from "../components/NavBar";
import { fastFadeIn } from "../animations";
function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchMovie());
    dispatch(FetchSeries());
  }, []);

  return (
    <div>
      <Nav />

      <Rows variants={fastFadeIn} initial="hidden" animate="show" />
    </div>
  );
}

export default Home;
