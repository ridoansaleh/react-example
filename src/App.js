import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getPosts(page);
  }, [page]);

  const getPosts = _page => {
    fetch("https://jsonplaceholder.typicode.com/posts?_page=" + _page)
      .then(response => response.json())
      .then(json => {
        setPosts(json);
      })
      .catch(err => console.error(err));
  };

  const handlePrevious = () => {
    setPage(page => page - 1);
  };

  const handleNext = () => {
    setPage(page => page + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts?title=" + title)
      .then(response => response.json())
      .then(json => {
        if (json.length) {
          setPosts(json);
        } else {
          alert("Sorry, No Data Found");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Search Post</h1>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Search by Title"
        />
        <button type="submit" className="submit-btn">
          Search
        </button>
      </form>
      <h1>List Of Post</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{`${post.id}. ${post.title}`}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      <div className="button-wrapper">
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={page === 10}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
