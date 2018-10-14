import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";
import Modal from '../../components/Modal';
import { Link } from "react-router-dom";
import Logo from './logo.svg';

class Register extends Component {
  // Setting our component's initial state
  state = {
    show: false,
    users: [],
    username: "",
    realname: "",
    photo: "",
    gender: "",
    password: "",
    confirmPass: ""

  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({
          users: res.data, username: "", realname: "", photo: "", gender: "",
          password: "", confirmPass: ""
        })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  
  hideModal = () => {
    this.setState({ show: false });
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPass) {
      this.setState({show: true})
    } 
    else {
      var bcrypt = require('bcryptjs');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(this.state.password, salt);
        API.saveBook({
          username: this.state.username,
          realname: this.state.realname,
          photo: this.state.photo,
          gender: this.state.gender,
          password: hash,
         
    
        })
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
     
      
    }
   

  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4"></Col>
          <Col size="md-4">
            <Jumbotron>
            <img className="img img-responsive logo-img" src={Logo}></img>
              <h1 className="text-center text-white formTitle">Sign up Here</h1>
              <hr></hr>
              <form>
                <Input
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  name="username"
                  placeholder="username (required)"
                />
                <Input
                  value={this.state.realname}
                  onChange={this.handleInputChange}
                  name="realname"
                  placeholder="realname (required)"
                />
                <Input
                  value={this.state.photo}
                  onChange={this.handleInputChange}
                  name="photo"
                  placeholder="photo (required)"
                />
                <Input
                  value={this.state.gender}
                  onChange={this.handleInputChange}
                  name="gender"
                  placeholder="gender (required)"
                />
                <Input
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  name="password"
                  placeholder="password (required)"
                  type="password"
                />
                <Input
                  value={this.state.confirmPass}
                  onChange={this.handleInputChange}
                  name="confirmPass"
                  placeholder="Confirm Password (required)"
                  type="password"
                />

                <Modal show={this.state.show} handleClose={this.hideModal}> <h3 className="text-white text-center">Passwords Don't Match! </h3></Modal>

                <FormBtn
                  className={
                    window.location.pathname === "/"
                  }
                  // linkTo = ""
                  disabled={!(this.state.realname && this.state.username && this.state.password && this.state.gender && this.state.photo)}
                  onClick={this.handleFormSubmit}
                >
                  Submit
              </FormBtn>
              </form>
              <Link to="/" className="nav-link text-white">
                Login
          </Link>
            </Jumbotron>
          </Col>
          <Col size="md-4"></Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
