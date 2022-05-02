import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "fbase";

const Home = () => {
  const [jweet, setJweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "jweets"), {
      jweet,
      createdAt: new Date(),
    });
    setJweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={jweet}
          placeholder="What's on your mind?"
          maxLength={120}
        ></input>
        <input type="submit" value="jweet"></input>
      </form>
    </div>
  );
};

export default Home;
