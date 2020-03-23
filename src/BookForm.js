import React, { Component } from "react";
import { connect } from "react-redux";
import { postBook, resetErrors } from "./redux/actions/index";


class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(
      this.state,
      [this.props.author.id],
      this.props.closeModal
    );
  };

  textChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.textChangeHandler}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="color"
              onChange={this.textChangeHandler}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.errorsState.errors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postBook: (book,author, closeModal) =>
      dispatch(postBook(book, author, closeModal)),
    resetErrors: () => dispatch(resetErrors())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookForm);