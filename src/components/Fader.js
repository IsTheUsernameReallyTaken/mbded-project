import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { Button } from "@material-ui/core";

const Fader = ({ text }) => {
  const [fadeProp, setFadeProp] = useState({
    fade: "fade-out",
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      if (fadeProp.fade === "fade-out") {
        setFadeProp({
          fade: "fade-in",
        });
      } else {
        setFadeProp({
          fade: "fade-out",
        });
      }
    }, 1000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <h1 className={fadeProp.fade}>
        <text
          style={{
            fontFamily: "Papyrus",
            fontSize: "60px",
          }}
        >
          {text}
        </text>
      </h1>
      <div className={fadeProp.fade}>
        <Button variant="contained" color="secondary">
          Login
        </Button>
      </div>
      <div className={fadeProp.fade}>
        <img
          style={{
            width: "25%",
            height: "30%",
            marginTop: "60px",
            borderRadius: "20px",
          }}
          src={process.env.PUBLIC_URL + "/images/city.jpg"}
          alt="homepage"
        />
      </div>
    </div>
  );
};

Fader.defaultProps = {
  text: "Hello World!",
};

Fader.propTypes = {
  text: PropTypes.string,
};

export default Fader;
