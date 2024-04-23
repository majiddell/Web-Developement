import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { StyledRow } from "../components/Row";

import {
  StyledReview,
  StyledVideo,
  StyledRecommendations,
  StyledMovie,
  StyledItem,
  StyledDetail,
  StyledCompanies,
  StyledMain,
} from "./Movie";
import { fastFadeIn } from "../animations";

//fetch
import FetchGenre from "../actions/genreAction";
import FetchMovieDetail from "../actions/movieDetailAction";
import FetchPersonDetail from "../actions/personDetailAction";
import FetchtvDetail from "../actions/tvDetailAction";

function TV() {
  function getURL(url) {
    if (url.startsWith("/https")) {
      return url.substring(1, url.length - 1);
    } else return `${baseURL(200)}${url}`;
  }

  function baseURL(size) {
    return `https://image.tmdb.org/t/p/w${size}`;
  }

  const {
    credit,
    detail,
    selected_isloading,
    reviews,
    videos,
    recommendations,
  } = useSelector((state) => state.tvDetail);

  const dispatch = useDispatch();

  function openPage(type, id) {
    if (type === "movie") dispatch(FetchMovieDetail(id));
    if (type === "tv") dispatch(FetchtvDetail(id));
    if (type === "person") dispatch(FetchPersonDetail(id));
    if (type === "genre") dispatch(FetchGenre(id, 1, 1));
    console.log("dispatched");
  }

  return (
    <>
      {!selected_isloading && (
        <StyledMain
          variants={fastFadeIn}
          initial="hidden"
          animate="show"
          className="container"
        >
          <StyledMovie className="container">
            <div className="row">
              <div className="name">
                <h1 className="col-2 title" style={{ color: "#9c0000" }}>
                  {detail.name}
                </h1>
                <h1 className="score">{`${detail.vote_average}/10`}</h1>
                <h1 className="score">{`${detail.vote_count} votes`}</h1>
              </div>

              <div>
                <img
                  src={`${baseURL(1280)}${detail.backdrop_path}`}
                  className="col-12 mx-auto"
                  alt="poster"
                ></img>

                {detail.tagline && (
                  <h1 className="tagline">{`"${detail.tagline}"`}</h1>
                )}

                <p className="col-10 mx-auto">{detail.overview}</p>
              </div>
            </div>
          </StyledMovie>

          <StyledRow>
            {credit.cast.map((item) => (
              <Link
                key={item.id}
                style={{ textDecoration: "none" }}
                to={`/${"person"}/${item.id}`}
                onClick={() => openPage("person", item.id)}
              >
                {item.profile_path && (
                  <StyledItem key={item.id} className="card-body">
                    <img
                      src={`${baseURL(400)}${item.profile_path}`}
                      alt="poster"
                      className="card-img-top"
                    ></img>
                    <h4 className="card-title">{item.name}</h4>
                    <p className="card-text">{`${item.character.substring(
                      0,
                      100
                    )}`}</p>
                  </StyledItem>
                )}
              </Link>
            ))}
          </StyledRow>

          <StyledDetail className="container">
            <h2>Genres</h2>
            <div className="row buttons">
              {detail.genres.map((genre) => (
                <button onClick={() => openPage("genre", genre.id)} id="button">
                  <Link to={`/genre/${genre.id}`}>
                    <h2>{genre.name}</h2>
                  </Link>
                </button>
              ))}
            </div>

            <h2 className="recommendations">Porduction Companies</h2>

            <StyledCompanies className="container">
              <div className="row">
                {detail.production_companies.map((pc) => (
                  <>
                    {pc.logo_path && (
                      <div key={pc.id} className="col company">
                        {pc.logo_path && (
                          <img
                            src={`${baseURL(200)}${pc.logo_path}`}
                            alt={pc.name}
                          ></img>
                        )}
                      </div>
                    )}
                    {!pc.logo_path && (
                      <div key={pc.id} className="col company">
                        {!pc.logo_path && <h2>{pc.name}</h2>}
                      </div>
                    )}
                  </>
                ))}
              </div>
            </StyledCompanies>
          </StyledDetail>

          {reviews.length > 0 && (
            <div>
              {reviews.map((rev) => (
                <StyledReview key={rev.id} className="container">
                  {rev.author_details.avatar_path && (
                    <img
                      src={getURL(rev.author_details.avatar_path)}
                      alt="df"
                    ></img>
                  )}
                  {rev.author && <h2>{rev.author}</h2>}
                  {rev.author_details.rating && (
                    <h3>{`${rev.author_details.rating}/10`}</h3>
                  )}
                  <p className="content">{rev.content}</p>
                </StyledReview>
              ))}
            </div>
          )}

          {videos[0] && videos[0].key && (
            <StyledVideo className="container">
              <iframe
                className="responsive-iframe"
                src={`https://www.youtube.com/embed/${videos[0].key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videos[0].name}
              />
            </StyledVideo>
          )}

          <h2 className="recommendations">recommendations</h2>

          <StyledRecommendations className="container">
            {recommendations.slice(0, 8).map((rec) => (
              <div>
                {rec.poster_path && (
                  <Link
                    key={rec.id}
                    style={{ textDecoration: "none" }}
                    to={`/${rec.media_type}/${rec.id}`}
                    onClick={() => openPage(rec.media_type, rec.id)}
                  >
                    <div className="card-body">
                      <img
                        src={`${baseURL(200)}${rec.poster_path}`}
                        alt="poster"
                        className="card-img-top"
                      ></img>
                      <h4 className="card-title">{rec.name}</h4>
                    </div>{" "}
                  </Link>
                )}
              </div>
            ))}
          </StyledRecommendations>
        </StyledMain>
      )}
    </>
  );
}

export default TV;
