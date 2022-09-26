import React, { Component } from "react";
import { connect } from "react-redux";
import { updateReply, deleteReply } from "../actions/replies";
import ReplyDataService from "../services/reply.service";

class Reply extends Component {
  constructor(props) {
    super(props);
    this.onChangeReply = this.onChangeReply.bind(this);
    this.getReply = this.getReply.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeReply = this.removeReply.bind(this);

    this.state = {
      currentReply: {
        id: null,
        content: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getReply(this.props.match.params.id);
  }

  onChangeReply(e) {
    const content = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReply: {
          ...prevState.currentReply,
          content: content,
        },
      };
    });
  }

  getReply(id) {
    ReplyDataService.get(id)
      .then((response) => {
        this.setState({
          currentReply: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateReply(this.state.currentReply.id, this.state.currentReply)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The tutorial was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeReply() {
    this.props
      .deleteReply(this.state.currentReply.id)
      .then(() => {
        this.props.history.push("/posts");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentReply } = this.state;

    return (
      <div>
        {currentReply ? (
          <div className="edit-form">
            <h4>Reply</h4>
            <form>
              <div className="form-group">
                <label htmlFor="content">Reply</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  value={currentReply.content}
                  onChange={this.onChangeReply}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeReply}
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
            <p>Please click on a Reply...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateReply, deleteReply })(Reply);
