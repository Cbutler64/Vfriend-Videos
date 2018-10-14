import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Subtitle from '../../components/Subtitle'
import Nav from "../../components/Nav";
import FriendCard from "../../components/FriendCard";
import Wrapper from "../../components/Wrapper";
import MemberBox from "../../components/MemberBox";
import { Link } from "react-router-dom";
import FriendsList from '../../components/FriendsList';
import "./Members.css";
import Hero from "../../components/Hero";

class Members extends Component {
  // Setting our component's initial state
  state = {
    user: [],
    users: [],
    users2: [],
    userFriends: [],
    username: "",
    realname: "",
    photo: "",
    gender: "",
    password: "",
    currentuserID: "",
    userFriendObjs: []

  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }


  loadFriends = () => {
    API.getBooks()
      .then(res => {
        this.setState({
          users: res.data,
        })


        console.log(this.state.users)
        var userFriendObjs = []
        for (var i = 0; i < this.state.users.length; i++) {
          if (this.state.userFriends.includes(this.state.users[i]._id)) {
            userFriendObjs.push(this.state.users[i])
          }

        }
        this.setState({ userFriendObjs: userFriendObjs })
        console.log(this.state.userFriendObjs)

      })
      .catch(err => console.log(err));
  };

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({
          users: res.data, username: "", realname: "", photo: "", gender: "",
          password: "",
        })


        console.log(this.state.users)
        var noCurrentUser = this.state.users
        for (var i = 0; i < noCurrentUser.length; i++) {
          if (localStorage.getItem("userID") == noCurrentUser[i]._id) {
            noCurrentUser.splice(i, 1);
          }

        }
        this.setState({
          users2: noCurrentUser
        })
        console.log(this.state.users)
        this.loadUser(localStorage.getItem("userID"))

      })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  loadUser = (id) => {
    console.log(id)
    API.getBook(id)
      .then(res => {
        this.setState({ user: res.data, username: res.data.realname, realname: res.data.realname, photo: res.data.photo, gender: res.data.gender, currentuserID: res.data._id, userFriends: res.data.friends, search: "", apiResults: [], })
        console.log(this.state.userFriends)
        this.loadFriends();
      })
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  goToFriend = id => {
    console.log(id);
    window.location.href = "/otheruser/" + id

  };

  checkFriend = (id) => {
    if (this.state.userFriends.includes(id)) {
      return true;
    }
    else {
      return false;
    }

  }

  handleFriends = friendID => {
    console.log(friendID);
    var userID = localStorage.getItem("userID")

    if (this.checkFriend(friendID)) {
      API.removeFriend(userID, friendID)
        .then(res => {

          this.loadBooks();
          console.log(res)

        })
        //console.log(this.state.users)
        .catch(err => console.log(err));
      console.log(this.state.users)
    }
    else {
      API.addFriend(userID, friendID)
        .then(res => {

          this.loadBooks();
          console.log(res)

        })
        //console.log(this.state.users)
        .catch(err => console.log(err));
      console.log(this.state.users)
    }
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();

  };

  render() {
    return (
      <div>
        <Nav />
        <Hero backgroundImage="https://coolbackgrounds.io/images/backgrounds/sea-edge-311c5cd5.png">
          <h1>Find New Vrienders</h1>

        </Hero>
        <br></br>
        <Container fluid>

          <Row>
            <Col size="md-10">

              <Subtitle data="Vrienders"></Subtitle>


              <MemberBox>
                {this.state.users2.map(friend => (
                  <FriendCard
                    goToFriend={this.goToFriend}
                    id={friend._id}
                    key={friend._id}
                    name={friend.username}
                    image={friend.photo}
                    realname={friend.realname}
                    gender={friend.gender}
                    checkFriend={this.checkFriend}
                    handleFriends={this.handleFriends}

                  >
                  </FriendCard>

                ))}
              </MemberBox>


            </Col>

            <Col size="md-2">
              <Subtitle data="Vriends"></Subtitle>
              {this.state.userFriendObjs.map(user => {
                return (

                  <FriendsList handleFriends={this.handleFriends} checkFriend={this.checkFriend} id={user._id} image={user.photo} name={user.username} userId={"/otheruser/" + user._id}></FriendsList>

                )
              })}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Members;
