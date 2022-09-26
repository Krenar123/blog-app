import React, { Component } from "react";
import { connect } from "react-redux";
import { updateComment, deleteComment } from "../actions/comments";
import CommentDataService from "../services/comment.service";
import { Link } from "react-router-dom";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.getComment = this.getComment.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeComment = this.removeComment.bind(this);

    this.state = {
      currentComment: {
        id: null,
        content: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getComment(this.props.match.params.id);
  }

  onChangeComment(e) {
    const content = e.target.value;

    this.setState(function (prevState) {
      return {
        currentComment: {
          ...prevState.currentComment,
          content: content,
        },
      };
    });
  }

  getComment(id) {
    CommentDataService.get(id)
      .then((response) => {
        this.setState({
          currentComment: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateComment(this.state.currentComment.id, this.state.currentComment)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The tutorial was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeComment() {
    this.props
      .deleteComment(this.state.currentComment.id)
      .then(() => {
        this.props.history.push("/posts");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentComment } = this.state;

    return (
      <div>
        {currentComment ? (
          <div className="edit-form">
            <h4>Comment</h4>
            <form>
              <div className="form-group">
                <label htmlFor="content">Comment</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  value={currentComment.content}
                  onChange={this.onChangeComment}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeComment}
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
            <ul className="list-group">
              {currentComment.comment_replies &&
                currentComment.comment_replies.map((reply, index) => (
                    <li
                    className={"list-group-item"}
                    key={index}
                    >
                        {reply.content}
                        <Link
                            to={"/replies/" + reply.id}
                            style={{ marginLeft: 20 }}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to={"/add-comment-reply/" + currentComment.id} className="nav-link">
                Add
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Comment...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateComment, deleteComment })(Comment);
