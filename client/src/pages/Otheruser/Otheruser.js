import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Hero from "../../components/Hero";
import Nav from "../../components/Nav";
import Subtitle from '../../components/Subtitle';
import SearchForm from "../../components/SearchForm";
import YouTube from 'react-youtube';
// import ModalPop from "../../components/Modal";
import Thumbnail from "../../components/Thumbnail";
import VideoCard from '../../components/VideoCard';
import ProfileCard from '../../components/ProfileCard';
import FriendsList from '../../components/FriendsList';
import Modal from '../../components/Modal';
import OtherUserBtn from '../../components/OtherUserBtn';
import VideoBox from "../../components/VideoBox";

import "./Otheruser.css";


class Home extends Component {
  // Setting our component's initial state

  state = {
    show: false,
    apiResults: [],
    searchQuery: "",
    user: [],
    users: [],
    realname: "",
    photo: "",
    gender: "",
    currentUserID: "",
    currentVideoID: "",
    username: "",
    userFriends: [],
    userFriendObjs: [],
    userVideos: [],
    userVideoObjs: [],
    currentUserVideos: [],
    currentUserFriends: [],

  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    let userID = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
    console.log(userID)
    this.loadUser(userID);
  }

  // Loads all User and sets them to this.state.User
  loadUser = (id) => {

    API.getBook(id)
      .then(res => {
        this.setState({ user: res.data, username: res.data.realname, realname: res.data.realname, photo: res.data.photo, gender: res.data.gender, currentuserID: res.data._id, userFriends: res.data.friends, userVideos: res.data.posts })
        console.log(this.state.user._id)

        this.loadFriends();

        console.log(this.state.userVideos)
        if (this.state.userVideos.length > 0) {
          this.loadVideos();

        }


      })
      .catch(err => console.log(err));

  };

  checkFriend = (id) => {
    if (this.state.currentUserFriends.includes(id)) {
      return true;
    }
    else {
      return false;
    }

  }

  handleFriends = friendID => {
    console.log(friendID);
    var userID = localStorage.getItem("userID")
    var otherUserID = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
    if (this.checkFriend(friendID)) {
      API.removeFriend(userID, friendID)
        .then(res => {

          this.loadUser(otherUserID);
          console.log(res)

        })
        //console.log(this.state.users)
        .catch(err => console.log(err));
      console.log(this.state.users)
    }
    else {
      API.addFriend(userID, friendID)
        .then(res => {

          this.loadUser(otherUserID);
          console.log(res)

        })
        //console.log(this.state.users)
        .catch(err => console.log(err));
      console.log(this.state.users)
    }
  };

  loadVideos = () => {
    console.log("test")
    for (var i = 0; i < this.state.userVideos.length; i++) {
      var query;
      if (query) {
        query = query + this.state.userVideos[i] + ",";
      }
      else {
        query = this.state.userVideos[i] + ",";
      }
    }
    var queryState = "multiSearch"
    console.log(query)
    API.searchAPI(queryState, query)
      .then(res => {
        this.setState({ userVideoObjs: res.data.items })
        console.log(this.state.apiResults);
        console.log(this.state.userVideoObjs)
        //this.test()
      })
      .catch(err => console.log(err));

  };

  loadFriends = () => {
    API.getBooks()
      .then(res => {
        this.setState({
          users: res.data,
        })


        //console.log(this.state.users)
        var userFriendObjs = []
        for (var i = 0; i < this.state.users.length; i++) {
          if (this.state.userFriends.includes(this.state.users[i]._id)) {
            userFriendObjs.push(this.state.users[i])
          }

        }
        this.setState({ userFriendObjs: userFriendObjs })
        console.log(this.state.userFriendObjs)
        this.loadUserVideos(localStorage.getItem("userID"))
      })
      .catch(err => console.log(err));
  };

  handleBtnPlay = id => {
    console.log(id)
    this.setState({ currentVideoID: id, show: true })
  };

  alreadySaved = (id) => {
    //console.log('look at me:')
    //console.log(this.state.userVideos)
    if (this.state.currentUserVideos.includes(id)) {
      return true;
    }
    else {
      return false;
    }

  }

  loadUserVideos = (id) =>{
    API.getBook(id)
      .then(res => {
        console.log(res)
        console.log(res.data.friends)
        this.setState({ currentUserVideos: res.data.posts, currentUserFriends: res.data.friends })
        console.log(this.state.currentUserFriends)
      })
      .catch(err => console.log(err));
  }
  

  handleBtnSave = (videoID) => {
    // for (var i = 0; i < this.state.apiResults.length; i++) {
    //   if (this.state.apiResults[i].id.videoId == videoID) {
    //     var vidToSave = this.state.apiResults[i];
    //   }
    // }
    // event.preventDefault();
    var currentUserID = localStorage.getItem("userID")
    var otherUserID = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
    if (this.alreadySaved(videoID)) {
      API.removeVideo(currentUserID, videoID)
        .then(res => {

          this.loadUser(otherUserID)
          console.log(res)

        })
        //console.log(this.state.users)
        .catch(err => console.log(err));
      console.log(this.state.users)
    }
    else {
      API.addVideo(currentUserID, videoID)
        .then(res => {

          this.loadUser(otherUserID)
          console.log(res)

        })
        //console.log(this.state.users)
        .catch(err => console.log(err));
    }
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

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  trimmedTitle = (title) => {
    console.log(title);
    if (title.length > 50){
      title = title.slice(0,50)
      return title + "..."
    }
    else {
      return title
    }
  };

  searchYoutube = query => {
    console.log(query)
    API.searchAPI(query)
      .then(res => {
        this.setState({ apiResults: res.data.items })
        console.log(this.state.apiResults);
      })
      .catch(err => console.log(err));
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchYoutube(this.state.searchQuery);
    // if (this.state.username && this.state.password) {
    //   API.getBooks()
    //     .then(res =>
    //       this.setState({ users: res.data })
    //     )
    //     .catch(err => console.log(err));
    // }
  };

  render() {
    return (
      <div>

        <Nav userLogged={this.state.user.username} />
        <Hero backgroundImage="https://coolbackgrounds.io/images/backgrounds/sea-edge-311c5cd5.png">
          <h1>Welcome to {this.state.user.username}'s profile! </h1>

        </Hero>
        <br></br>
        <Container fluid>
          <Row>

            <Col size="md-3">

              <Subtitle data={this.state.username.toUpperCase() + " Profile"}></Subtitle>

              <ProfileCard
                id={this.state.user._id}
                key={this.state.user._id}
                name={this.state.user.username}
                image={this.state.user.photo}
                realname={this.state.user.realname}
                gender={this.state.user.gender}

              />

           <OtherUserBtn
                   data-value="follow"
                  
                   id={this.state.user._id}
                   checkFriend={this.checkFriend(this.state.user._id)}
                   handleFriends={this.handleFriends}
                   >

           </OtherUserBtn>

            

            </Col>

            <Col size="md-7">
              <Subtitle data={this.state.username.toUpperCase() + " Videos"}></Subtitle>

              <Modal show={this.state.show} handleClose={this.hideModal}>

                                <YouTube videoId= {this.state.currentVideoID}
                 
                  onReady={this._onReady}></YouTube>
              </Modal>
              {this.state.userVideoObjs.length ? (
              <VideoBox className="video-container">
                  
                    {this.state.userVideoObjs.map(result => (
                      
                      <VideoCard image={result.snippet.thumbnails.high.url}
                      title={result.snippet.title}
                      trimmedTitle = {this.trimmedTitle}
                      key={result.id}
                      id={result.id}
                      handleBtnPlay={this.handleBtnPlay}
                      handleBtnSave={this.handleBtnSave}
                      alreadySaved={this.alreadySaved}
                      >
                      </VideoCard>

))}





</VideoBox>
                    ) : (
                      <h3></h3>
                    )}   
            </Col>

            <Col size="md-2">
              <Subtitle data={this.state.username.toUpperCase() + " Vriends"} ></Subtitle>


              {this.state.userFriendObjs.map(user => {
                return (

                    <FriendsList image={user.photo} name={user.username} userId={"/otheruser/" + user._id}></FriendsList>
                 
                )
              })}


            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
