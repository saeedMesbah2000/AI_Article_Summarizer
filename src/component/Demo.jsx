import React, {useState, useEffect} from "react";

import {copy, linkIcon, loader, tick} from "../assets";
import {useLazyGetSummaryQuery} from "../store/article";

const Demo = () => {
  const [article, setArticle] = useState(() => {
    return {
      url: "",
      summary: "",
    };
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copyUrl, setCopyUrl] = useState("");
  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  // Load data from localStorage when ever page reloads
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  // setting the value of the url based on user's input
  const inputOnChangeHandler = (event) => {
    console.log(event.target.value);
    setArticle((prevState) => {
      return (prevState = {...prevState, url: event.target.value});
    });
  };

  // handling the submit button
  const submitHandler = async (event) => {
    event.preventDefault();
    const {data} = await getSummary({articleUrl: article.url});

    if (data?.summary) {
      const newArticle = {...article, summary: data.summary};
      const allNewArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(allNewArticles);
      localStorage.setItem("articles", JSON.stringify(allNewArticles));
      console.log(newArticle);
    }
  };

  // copying the url to the clipboard
  const copyHandler = (wantedUrl) => {
    setCopyUrl(wantedUrl);

    navigator.clipboard
      .writeText(wantedUrl)
      .then(() => {
        console.log("successfully copied");
      })
      .catch(() => {
        console.log("something went wrong");
      });

    setTimeout(() => setCopyUrl(false), 3000);
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
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article, index) => {
            return (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(article)}
                className="link_card">
                <div
                  className="copy_btn"
                  onClick={() => copyHandler(article.url)}>
                  <img
                    src={copyUrl === article.url ? tick : copy}
                    alt="copy-icon"
                    className="w-[40%] h-[40%] object-contain"
                  />
                </div>
                <p>{article.url}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* this is where the resultes will be showen */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            somethig is wrong.....
            <br />
            <span className="font-satoshi font-normal">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
