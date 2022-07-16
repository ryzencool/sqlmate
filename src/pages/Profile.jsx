import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  let navigate = useNavigate();
  return (
    <div>
      Profile some name is good
      <button
        onClick={() => {
          navigate("/about");
        }}
      >
        change to home{" "}
      </button>
    </div>
  );
}

export default Profile;
