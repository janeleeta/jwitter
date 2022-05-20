import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li style={{ marginTop: 20 }}>
          <Link
            to="/profile"
            style={{
              marginTop: 20,
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="x" />
            <span style={{ marginTop: 10, marginLeft: 8, fontSize: 14 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 Profile`
                : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
