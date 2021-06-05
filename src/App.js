import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import logo from "./clarusway_logo.png";

function App() {
  const [search, setSearch] = useState("");
  const [news, setNews] = useState(null);

  const url = `http://hn.algolia.com/api/v1/search?query=${search}`;

  const getNews = async () => {
    const response = await axios.get(url);
    setNews(response?.data?.hits);
  };
  return (
    <div className="App">
      <img src={logo} alt="Clarusway" />
      <h1>Clarusway News App</h1>
      <div>
        <label>Search:</label>
        <input
          data-testid="input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? getNews() : null)}
        />
      </div>
      <div>
        <button onClick={getNews}>Go to news</button>
      </div>
      <div>
        <ul>
          {news ? (
            news.map((item) => {
              return (
                <li key={item?.objectID}>
                  <a href={item.url} target="_blank" rel="noreferrer" >
                    {item?.title}
                  </a>
                </li>
              );
            })
          ) : (
            <h5 data-testid="loading">No news....</h5>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
