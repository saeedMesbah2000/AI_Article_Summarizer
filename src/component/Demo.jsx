import React from "react";
import {useState, useEffect} from "react";
import {copy, linkIcon, loader, tick} from "../assets";

const Demo = () => {
  const [article, setArticle] = useState(() => {
    return {
      url: "",
      summary: "",
    };
  });

  const inputOnChangeHandler = (event) => {
    console.log(event.target.value);
    setArticle((prevState) => {
      return (prevState = {...prevState, url: event.target.value});
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // setArticle
    alert("submit button has been clicked");
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={submitHandler}
          className="relative flex justify-center items-center">
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-5 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={inputOnChangeHandler}
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            <p>↵</p>
          </button>
        </form>

        {/* this is where history will be showed */}
      </div>

      {/* this is where the resultes will be showen */}
    </section>
  );
};

export default Demo;
