import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import styled from "styled-components";

import FetchtvDetail from "../actions/tvDetailAction";
import { useEffect } from "react";
import { getGenreNamedByID } from "../getGenreNameByID";
import { Link } from "react-router-dom";

import FetchMovieDetail from "../actions/movieDetailAction";
import FetchGenre from "../actions/genreAction";

import { useState } from "react";

import right from "../icons/right.svg";
import left from "../icons/left.svg";

function Genre() {
  function openPage(type, id) {
    if (type === "movie") dispatch(FetchMovieDetail(id));
    if (type === "tv") dispatch(FetchtvDetail(id));
  }

  function baseURL(size) {
    return `https://image.tmdb.org/t/p/w${size}`;
  }

  const { tv, movie, selected_isloading, id } = useSelector(
    (state) => state.genre
  );

  const dispatch = useDispatch();

  const [tvpage, settvpage] = useState(1);
  const [moviepage, setmoviepage] = useState(1);

  function incPage() {
    console.log("incpage");

    if (content === "movie") {
      setmoviepage(moviepage + 1);
    }

    if (content === "tv") {
      settvpage(tvpage + 1);
    }
  }

  function decPage() {
    console.log("decpage");
    if (content === "movie" && moviepage >= 2) {
      setmoviepage(moviepage - 1);
    }

    if (content === "tv" && tvpage > 1) {
      settvpage(tvpage - 1);
    }
  }

  useEffect(() => {
    settvpage(1);
    setmoviepage(1);
    console.log("set movie page and tv page to 1");
  }, []);

  const [content, setcontent] = useState("movie");

  useEffect(() => {
    dispatch(FetchGenre(id, moviepage, tvpage));
  }, [moviepage, tvpage]);

  return (
    <>
      {(!selected_isloading || movie.length > 0) && (
        <>
          <StyledGrid className="container">
            <h1 className="genreName">{getGenreNamedByID(id)}</h1>
            <hr></hr>
            <div className="content">
              <button
                className={content === "movie" ? "selected" : ""}
                onClick={() => setcontent("movie")}
              >
                movie
              </button>
              <button
                className={content === "tv" ? "selected" : ""}
                onClick={() => setcontent("tv")}
              >
                tv
              </button>
            </div>

            {content === "movie" && (
              <div className="row">
                {movie.map((m) => (
                  <>
                    {m.backdrop_path && (
                      <Link
                        to={`/movie/${m.id}`}
                        className=" mycard col-lg-4 col-md-6 col-sm-12"
                      >
                        <img
                          key={m.id}
                          src={`${baseURL(400)}${m.backdrop_path}`}
                          onClick={() => openPage("movie", m.id)}
                          alt="poster"
                        ></img>
                        <h2>{m.title}</h2>
                      </Link>
                    )}
                  </>
                ))}
              </div>
            )}
            {content === "tv" && (
              <div className="row">
                {tv.map((m) => (
                  <>
                    {m.backdrop_path && (
                      <Link
                        to={`/tv/${m.id}`}
                        className=" mycard col-lg-4 col-md-6 col-sm-12"
                        onClick={() => openPage("tv", m.id)}
                      >
                        <img
                          key={m.id}
                          src={`${baseURL(400)}${m.backdrop_path}`}
                          alt="poster"
                        ></img>
                        <h2>{m.name}</h2>
                      </Link>
                    )}
                  </>
                ))}
              </div>
            )}
            <div className="navigation">
              <img
                className="left"
                onClick={() => decPage()}
                src={left}
                alt="poster"
              ></img>
              {content === "movie" && <h2>{moviepage}</h2>}
              {content === "tv" && <h2>{tvpage}</h2>}
              <img
                className="right"
                onClick={() => incPage()}
                src={right}
                alt="poster"
              ></img>
            </div>
          </StyledGrid>
        </>
      )}
    </>
  );
}

const StyledGrid = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .genreName {
    margin: 1vh auto;
    color: #9c0000;
    font-size: 40px;
    font-weight: 450;
  }

  hr {
    margin: auto;
    margin-bottom: 2vh;
    margin-top: 1vh;

    width: 90%;
    border: 1px solid;
    color: #7c7c7cd3;
  }
  .row {
    a {
      text-decoration: none;
    }
    .mycard {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    img {
      margin: 1vh auto;
      width: 350px;
      object-fit: cover;
      @media only screen and (max-width: 800px) {
        width: 300px;
        margin: 0 auto;
      }
    }
    h2 {
      color: #bdbdbddf;
      max-width: 340px;
      font-weight: 400;
      margin-bottom: 2vh;
    }
  }

  .navigation {
    display: flex;
    justify-content: space-around;
    align-items: center;

    h2 {
      color: white;
      margin: 50px;

      @media only screen and (min-width: 800px) {
        line-height: 24px;
        font-size: 15px;
      }
    }

    img {
      position: fixed;
      bottom: 1vh;
      width: 50px;
      object-fit: cover;
      margin: 1vw;
      border-radius: 50%;
      background-color: #00ffff45;
      border-width: 0;
      font-size: 40px;

      cursor: pointer;

      :hover {
        background-color: #00949e45;
      }
    }

    .left {
      left: 6vw;
    }
    .right {
      right: 6vw;
    }
  }

  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    h2 {
      color: white;
    }
    .selected {
      color: #dddddd;
    }

    button {
      margin: 1vw;
      border-radius: 3px;
      background-color: transparent;
      color: #6e6e6e;
      border-width: 0;
      font-size: 40px;
      font-weight: 250;

      @media only screen and (max-width: 800px) {
        font-size: 25px;
      }

      :hover {
        color: #c9c9c9;

        transition: ease-in;
        transition-duration: 0.2s;
      }
    }
  }
`;

export default Genre;
