import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrievePosts,
  findPostsByContent,
  deleteAllPosts,
} from "../actions/posts";
import { Link } from "react-router-dom";

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchContent = this.onChangeSearchContent.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActivePost = this.setActivePost.bind(this);
    this.findByContent = this.findByContent.bind(this);
    this.removeAllPosts = this.removeAllPosts.bind(this);

    this.state = {
      currentPost: null,
      currentIndex: -1,
      searchContent: "",
    };
  }

  componentDidMount() {
    this.props.retrievePosts();
  }

  onChangeSearchContent(e) {
    const searchContent = e.target.value;

    this.setState({
      searchContent: searchContent,
    });
  }

  refreshData() {
    this.setState({
      currentPost: null,
      currentIndex: -1,
    });
  }

  setActivePost(post, index) {
    this.setState({
      currentPost: post,
      currentIndex: index,
    });
  }

  removeAllPosts() {
    this.props
      .deleteAllPosts()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByContent() {
    this.refreshData();

    this.props.findPostsByContent(this.state.searchContent);
  }

  render() {
    const { searchContent, currentPost, currentIndex } = this.state;
    const { posts } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by content"
              value={searchContent}
              onChange={this.onChangeSearchContent}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByContent}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Posts List</h4>

          <ul className="list-group">
            {posts &&
              posts.map((post, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePost(post, index)}
                  key={index}
                >
                  {post.content}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPosts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPost ? (
            <div>
              <h4>Post</h4>
              <div>
                <label>
                  <strong>Content:</strong>
                </label>{" "}
                {currentPost.content}
              </div>

              <Link
                to={"/posts/" + currentPost.id}
                className="badge badge-warning"
              >
                Edit
              </Link>

              <div>
                <label>
                  <strong>Comments:</strong>
                </label>{" "}
                <ul className="list-group">
                  {currentPost.comments &&
                    currentPost.comments.map((comment, index) => (
                      <li
                        className={"list-group-item"}
                        key={index}
                      >
                        {comment.content}
                        <Link
                          to={"/comments/" + comment.id}
                          style={{ marginLeft: 20 }}
                          className="badge badge-warning"
                        >
                          Edit
                        </Link>
                      </li>
                    ))}
                </ul>
                <Link to={"/add-comment/" + currentPost.id} className="nav-link">
                  Add
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Post...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps, {
  retrievePosts,
  findPostsByContent,
  deleteAllPosts,
})(PostsList);
