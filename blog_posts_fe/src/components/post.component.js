import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost, deletePost } from "../actions/posts";
import PostDataService from "../services/post.service";

class Post extends Component {
  constructor(props) {
    super(props);
    this.onChangePost = this.onChangePost.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removePost = this.removePost.bind(this);

    this.state = {
      currentPost: {
        id: null,
        content: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getPost(this.props.match.params.id);
  }

  onChangePost(e) {
    const content = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPost: {
          ...prevState.currentPost,
          content: content,
        },
      };
    });
  }

  getPost(id) {
    PostDataService.get(id)
      .then((response) => {
        this.setState({
          currentPost: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updatePost(this.state.currentPost.id, this.state.currentPost)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The tutorial was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removePost() {
    this.props
      .deletePost(this.state.currentPost.id)
      .then(() => {
        this.props.history.push("/posts");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentPost } = this.state;

    return (
      <div>
        {currentPost ? (
          <div className="edit-form">
            <h4>Post</h4>
            <form>
              <div className="form-group">
                <label htmlFor="content">Post</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  value={currentPost.content}
                  onChange={this.onChangePost}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.removePost}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Post...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updatePost, deletePost })(Post);
