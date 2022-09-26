import React, { Component } from "react";
import { connect } from "react-redux";
import { createReply } from "../actions/replies";

class AddReply extends Component {
  constructor(props) {
    super(props);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.saveReply = this.saveReply.bind(this);
    this.newReply = this.newReply.bind(this);

    this.state = {
      id: null,
      content: "",
      commentable_id: this.props.match.params.id,
      commentable_type: "Comment",
      user_id: 1,

      submitted: false,
    };
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value,
    });
  }

  saveReply() {
    const { content, commentable_id, commentable_type, user_id } = this.state;

    this.props
      .createReply(content, commentable_id, commentable_type, user_id)
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

  newReply() {
    this.setState({
      id: null,
      content: "",
      commentable_id: this.props.match.params.id,
      commentable_type: "Comment",
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
            <button className="btn btn-success" onClick={this.newReply}>
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

            <button onClick={this.saveReply} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createReply })(AddReply);
