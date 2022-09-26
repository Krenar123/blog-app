import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPost from "./components/add-post.component";
import AddComment from "./components/add-comment.component";
import AddReply from "./components/reply-comment.component";
import Post from "./components/post.component";
import Comment from "./components/comment.component";
import Reply from "./components/reply.component";
import PostsList from "./components/posts-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/posts"} className="navbar-brand">
            Krenar
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/posts"} className="nav-link">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/posts"]} component={PostsList} />
            <Route exact path="/add" component={AddPost} />
            <Route exact path="/add-comment/:id" component={AddComment} />
            <Route exact path="/add-comment-reply/:id" component={AddReply} />
            <Route path="/posts/:id" component={Post} />
            <Route path="/comments/:id" component={Comment} />
            <Route path="/replies/:id" component={Reply} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
