import React, { useRef, useState } from "react";
import "./Post.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/php/php";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/go/go";
import "codemirror/mode/sql/sql";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/shell/shell";
import { Link } from "react-router-dom";
import { useUser } from "../../Contexts/AuthUserContext";
import axios from "axios";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
const ORIGIN_API = process.env.REACT_APP_ORIGIN_API;

const Post = () => {
  const { authUser } = useUser();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const title = useRef();
  const environment = useRef();
  const [description, setDescription] = useState("");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handlePost = async (e) => {
    const newPost = {
      title: title.current.value,
      language: language,
      environment: environment.current.value,
      code: code,
      description: description,
      authorId: authUser._id,
    };

    await axios.post(ORIGIN_API + "/posts/new", newPost);
  };

  return (
    <div className="post-container">
      <h1>Let's Share Your Snippet</h1>
      <Link to="/">
        <img
          src={PUBLIC_FOLDER + authUser.profileImage}
          alt="Profile"
          className="profile-img"
        />
      </Link>
      <form className="post-form" onSubmit={(e) => handlePost(e)}>
        <div className="form-columns">
          <div className="left-column">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                placeholder=""
                required
                ref={title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="xml">HTML/XML</option>
                <option value="css">CSS</option>
                <option value="clike">C/C++/Java/C#</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="sql">SQL</option>
                <option value="markdown">Markdown</option>
                <option value="shell">Shell</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="environment">Environment</label>
              <input
                id="environment"
                name="environment"
                placeholder="ex. Node.js 14.0.0, Browser"
                required
                ref={environment}
              />
            </div>
            <div className="form-group">
              <label htmlFor="explanation">Description</label>
              <textarea
                id="explanation"
                name="explanation"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="right-column">
            <div className="form-group full-width">
              <label htmlFor="snippet">Snippet</label>
              <CodeMirror
                value={code}
                options={{
                  mode: language,
                  theme: "default",
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                  setCode(value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-group full-width">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
