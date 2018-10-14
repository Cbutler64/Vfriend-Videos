import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import "./Login.css";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Modal from '../../components/Modal';
import Nav from "../../components/Nav";
import Logo from './logo.svg'
import { spawn } from "child_process";
class Home extends Component {
  // Setting our component's initial state
  state = {
    show: false,
    users: [],
    realname: "",
    photo: "",
    gender: "",
    password: "",


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
          username: "", realname: "", photo: "", gender: "",
          password: "",
        })
      )
      .catch(err => console.log(err));
  };

 

  hideModal = () => {
    this.setState({ show: false });
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
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

    localStorage.clear()
    event.preventDefault();
    //console.log("username: " + this.state.username + " pass: " + this.state.password);
    if (this.state.username && this.state.password) {
      API.getBookName(this.state.username)
          .then(res => {
            this.setState({ users: res.data })
            var bcrypt = require('bcryptjs');
            if (bcrypt.compareSync(this.state.password, this.state.users.password))
            {
              localStorage.setItem("userID", this.state.users._id)
              localStorage.setItem("username", this.state.username)
              window.location.href = "/home"     
            }
            else{
              this.setState({show: true})

            }


          })
          //console.log(this.state.users)
          .catch(err => {
            this.setState({show: true})
          });
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
              <h1 className="text-center text-white formTitle">Login </h1>
        
              <hr></hr>
              <form>
                <Input
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  name="username"
                  placeholder="username (required)"

                />
                <Input
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  name="password"
                  type="password"
                  placeholder="password (required)"
                />

                <FormBtn className={
                  window.location.pathname === "/home"

                }
                  onClick={this.handleFormSubmit}
                  disabled={!(this.state.username && this.state.password)}
                >
                  Submit
              </FormBtn>

              <Modal show={this.state.show} handleClose={this.hideModal}> <h3 className="text-white text-center">Incorrect Password or Username ! Try Again. </h3></Modal>
              </form>
              <Link to="/register" className="nav-link text-white" >
                Register
          </Link>
            </Jumbotron>
          </Col>
          <Col size="md-4"></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
