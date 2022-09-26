import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../actions/posts";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.savePost = this.savePost.bind(this);
    this.newPost = this.newPost.bind(this);

    this.state = {
      id: null,
      content: "",
      user_id: 1,

      submitted: false,
    };
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value,
      user_id: 1,
    });
  }

  savePost() {
    const { content } = this.state;

    this.props
      .createPost(content)
      .then((data) => {
        this.setState({
          id: data.id,
          content: data.content,
          user_id: 1,

          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newPost() {
    this.setState({
      id: null,
      content: "",
      user_id: 1,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPost}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <input
                type="text"
                className="form-control"
                id="content"
                required
                value={this.state.content}
                onChange={this.onChangeContent}
                name="content"
              />
            </div>

            <button onClick={this.savePost} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createPost })(AddPost);
