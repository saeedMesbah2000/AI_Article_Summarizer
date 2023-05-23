import React from "react";
import {logo} from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex flex-col justify-center items-center">
      <nav className="flex flex-row w-full justify-between items-center mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => {
            window.open(
              "https://github.com/saeedMesbah2000/AI_Article_Summarizer",
              "_blank"
            );
          }}
          className="black_btn">
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500">
          OpenAI GPT-4{" "}
        </span>
      </h1>

      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
