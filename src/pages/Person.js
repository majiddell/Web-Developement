import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import styled from "styled-components";

import Carousel from "react-bootstrap/Carousel";
import FetchMovieDetail from "../actions/movieDetailAction";
import FetchtvDetail from "../actions/tvDetailAction";
import { fastFadeIn } from "../animations";

function Person() {
  function baseURL(size) {
    return `https://image.tmdb.org/t/p/w${size}`;
  }

  const { detail, selected_isloading, credit, image } = useSelector(
    (state) => state.person
  );

  function getImage(Images) {
    const result = [];

    for (let i = 0; i < Images.length; i++) {
      if (Images[i].file_path && !Images[i].file_path.includes("https")) {
        result.push(Images[i]);
      }

      if (i === 20) {
        break;
      }
    }
    console.log(result);
    return result;
  }

  const dispatch = useDispatch();
  function openPage(type, id) {
    if (type === "movie") dispatch(FetchMovieDetail(id));
    if (type === "tv") dispatch(FetchtvDetail(id));
  }

  return (
    <>
      {!selected_isloading && (
        <motion.div variants={fastFadeIn} initial="hidden" animate="show">
          <div>
            <div className="container">
              <h1 style={{ margin: "2vw" }}>{detail.name}</h1>
              <div className="row">
                <StyledCarosel className="col-xl-5">
                  <Carousel>
                    {getImage(image.profiles).map((img) => (
                      <Carousel.Item key={img.id}>
                        <img
                          className="profilePics "
                          src={`${baseURL(1280)}${img.file_path}`}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </StyledCarosel>

                <StyledBiography className="container col-xl-7">
                  <p>{detail.biography}</p>
                  <h3>{`place of birth : ${detail.place_of_birth}`}</h3>
                  <h3>{`known for  ${detail.known_for_department}`}</h3>
                  <h3>{`birthday : ${detail.birthday}`}</h3>
                </StyledBiography>
              </div>
            </div>
          </div>

          <StyledPlayed className="container">
            <h2>{`More From ${detail.name}`}</h2>
            <hr className="hr col-12"></hr>
            {credit.cast.map((cast) => (
              <>
                {cast.poster_path && cast.character && (
                  <Link
                    key={cast.id}
                    to={`/${cast.media_type}/${cast.id}`}
                    onClick={() => openPage(cast.media_type, cast.id)}
                  >
                    <StyledCard key={cast.id}>
                      <img
                        src={`${baseURL(200)}${cast.poster_path}`}
                        alt="poster"
                      ></img>
                      <h4>{` ${cast.character}`}</h4>
                    </StyledCard>
                  </Link>
                )}
              </>
            ))}
          </StyledPlayed>
        </motion.div>
      )}
    </>
  );
}

const StyledCarosel = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  .profilePics {
    width: 100%;

    object-fit: cover;
  }
`;

const StyledCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  img {
    height: 300px;
    object-fit: cover;
  }
  h4 {
    width: 200px;
    margin: 1vh auto;
  }
`;

const StyledBiography = styled(motion.div)`
  p {
    font-size: 16px;
    margin: 1vh 0;
    line-height: 3.9vw;
    font-size: 3.5vw;
    line-height: 20px;
    font-size: 15px;
    @media only screen and (min-width: 800px) {
      line-height: 24px;
      font-size: 15px;
    }

    @media only screen and (min-width: 1200px) {
      line-height: 25px;
      font-size: 16px;
    }
  }

  h3 {
    font-size: 18px;
    color: gray;
    margin: 1vh 1vw;
  }
`;

const StyledPlayed = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  h2 {
    color: #ffffff;
    margin: 0 auto;
    margin-top: 4vh;
    font-weight: 300;
  }
  hr {
    margin: 3vh;
    border: 2px solid;
    border-color: #ffffff;
    color: #ffffff;
  }
`;

export default Person;
