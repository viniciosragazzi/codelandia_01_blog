import { useState, useEffect } from "react";

import "./Styles/App.css";
import { BiSearch } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
export default function App() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    setIsLoading(true);
    const result = await fetch(url);
    const posts = await result.json();
    setPosts(posts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const likeClick = (e) => {
    const idPai = e.nativeEvent.path[2];
    console.log(e.target.innerHTML);
    const el = e.nativeEvent.path[0];
    if (idPai.classList.contains("liked")) {
      idPai.classList.remove("liked");
      idPai.classList.add("unliked");
    } else {
      idPai.classList.remove("unliked");
      idPai.classList.add("liked");
    }
  };
  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="top">
            <a href="#" className="text_top">
              Codelândia
            </a>
            <a href="#" className="text_top">
              blog
            </a>
          </div>
          <div className="search_area">
            <div className="svgArea">
              <BiSearch />
            </div>
            <input type="text" placeholder="Pesquisar no blog" onChange={(e) => {setSearch(e.target.value);}} />
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            posts.filter((post) => { return post.title.toLowerCase().includes(search.toLowerCase()) }).map((post) =>
            post.id <= page * 10 ? (
              <div className="card" id={`post-${post.id}`}>
                <div className="top">
                  <span className="date">18/07/2022</span>
                  <div
                    className="heart"
                    onClick={(e) => {
                      likeClick(e);
                    }}
                  ></div>
                </div>
                <div className="content">
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                </div>
              </div>
            ) : null
          )
          )}
          <a
            href={`#post-${page * 10 - 10}`}
            onClick={() => {
              setPage(page + 1);
            }}
            className="button"
          >
            Mostrar mais
          </a>
        </div>
      </main>
    </div>
  );
}
