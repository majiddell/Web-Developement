import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import styled from "styled-components";

import FetchtvDetail from "../actions/tvDetailAction";

import { Link } from "react-router-dom";
import FetchPersonDetail from "../actions/personDetailAction";
import { StyledRow } from "../components/Row";
import FetchMovieDetail from "../actions/movieDetailAction";
import FetchGenre from "../actions/genreAction";
import { fastFadeIn } from "../animations";

function Movie() {
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
  } = useSelector((state) => state.movieDetail);

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
                  {detail.title}
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
                key={`${item.id}${item.character}`}
                style={{ textDecoration: "none" }}
                to={`/person/${item.id}`}
                onClick={() => openPage("person", item.id)}
              >
                {item.profile_path && (
                  <StyledItem
                    key={`${item.id}${item.character}`}
                    className="card-body"
                  >
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
                <button
                  key={genre.id}
                  onClick={() => openPage("genre", genre.id)}
                  id="button"
                >
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
                      <h4 className="card-title">{rec.original_title}</h4>
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

export const StyledMain = styled(motion.div)`
  .recommendations {
    font-size: 1.8vw;
    color: gray;
    margin: 2vh 1vw;
  }
`;

export const StyledCompanies = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  img {
    object-fit: cover;
    padding: 1vh;
    @media only screen and (max-width: 601px) {
      width: 40vw;
    }
  }

  .company {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledRecommendations = styled(motion.div)`
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0;
  h4 {
    color: #d6d6d6;
    width: 25vh;
    margin: 0.5vw 1vh 3vw 1vh;
    font-weight: 350;
    font-size: 20px;

    @media only screen and (max-width: 601px) {
      font-size: 15px;
    }
  }
  img {
    margin: 1vh;
    width: 25vh;
    object-fit: cover;
  }
`;

export const StyledVideo = styled(motion.div)`
  position: relative;
  overflow: hidden;
  width: 90%;
  padding-top: 50.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  /* Then style the iframe to fit in the container div with full height and width */
  .responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

export const StyledReview = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 5vh 0;

  h2 {
    font-size: 1.2vw;
    color: gray;
    margin: 2vh 1vw;

    @media screen and (max-width: 800px) {
      font-size: 2vw;
      margin: 2vh 0vw;
    }
  }
  h3 {
    color: yellow;
    font-size: 2vw;
    margin: auto 1vw;
  }
  img {
    margin: 1rem;
    width: 6vh;
    height: 6vh;
    border-radius: 50%;

    @media screen and (min-width: 800px) {
      width: 8vh;
      height: 8vh;
    }
  }
  .content {
    width: 100%;
    padding: 1vh 1vw;
    font-size: 2vw;
    line-height: 1.8vh;

    font-weight: 350;
    @media screen and (min-width: 800px) {
      font-size: 1.3vw;
      line-height: 1.6vw;
    }
  }
`;

export const StyledMovie = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    font-size: 2rem;
    margin: 2vh 1vw 5vh 1vw;
  }
  .title {
    font-size: 25px;

    @media only screen and (max-width: 800px) {
      font-size: 2.5vw;
    }
  }
  img {
    object-fit: cover;
    width: 100%;
  }

  .tagline {
    font-weight: 400;
    color: #3e8f71;
    margin: 4vh auto;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    display: flex;
    justify-content: center;
    width: 60%;
    font-size: 30px;

    @media only screen and (max-width: 601px) {
      font-size: 18px;
      width: 70%;
    }
  }
  .name {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .row {
      display: flex;
      justify-content: baseline;
      align-items: center;
      flex-wrap: wrap;
    }

    .score {
      font-size: 25px;

      @media only screen and (max-width: 800px) {
        font-size: 2.5vw;
      }
    }
  }
`;

export const StyledItem = styled(motion.div)`
  padding: 5px;
  img {
    width: 210px;

    object-fit: cover;
    margin: 0 5px;

    @media only screen and (max-width: 601px) {
      width: 150px;
    }
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledDetail = styled(motion.div)`
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 4vh 0;
  }

  h2 {
    color: gray;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    #button {
      width: fit-content;
      margin: 0.5vw 1.5vw;
      background-color: transparent;
      border: 1px solid gray;
      border-radius: 10px;
      padding: 0.3vw 1vw;

      a {
        text-decoration: none;
      }
      :hover {
        background-color: #444444;
      }
    }
  }
`;

export default Movie;
