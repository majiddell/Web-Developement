import axios from "axios";

import {
  toprated_movie,
  upcoming_movie,
  popular_movie,
  now_playing_movie,
  latest_movie,
  search,
  trending_week_all,
  top_rated_series,
} from "../api";

const FetchMovie = () => async (dispatch) => {
  dispatch({
    type: "LOADING_MOVIE",
  });

  const top_reted_list = await axios.get(toprated_movie());
  const upcoming_movie_list = await axios.get(upcoming_movie());
  const popular_movie_list = await axios.get(popular_movie());
  const now_playing_movie_list = await axios.get(now_playing_movie());
  const latest_movie_list = await axios.get(latest_movie());
  const trending_list = await axios.get(trending_week_all());
  const top_rated_tv_list = await axios.get(top_rated_series());

  dispatch({
    type: "FETCH_MOVIE",
    payload: {
      topRated: top_reted_list.data.results,
      upcoming: upcoming_movie_list.data.results,
      popular: popular_movie_list.data.results,
      nowPlaying: now_playing_movie_list.data.results,
      latest: latest_movie_list.data.results,
      trending: trending_list.data.results,
      topratedtv: top_rated_tv_list.data.results,
    },
  });
};

export const FetchSearched = (keyword) => async (dispatch) => {
  const searched_results = await axios.get(search(keyword));

  dispatch({
    type: "SEARCH",
    payload: {
      searched: searched_results.data.results,
    },
  });
};

export default FetchMovie;
