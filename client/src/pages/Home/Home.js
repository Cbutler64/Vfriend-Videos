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
//import Youtube from '../../components/Youtube';
// import ModalPop from "../../components/Modal";
import Thumbnail from "../../components/Thumbnail";
import HomeVideoCard from '../../components/HomeVideoCard';
import ProfileCard from '../../components/ProfileCard';
import FriendsList from '../../components/FriendsList';
import Modal from '../../components/Modal';
import VideoBox from "../../components/VideoBox";
import YouTube from 'react-youtube';
import "./Home.css";


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
    userVideoFeed: [],
    userVideoObjs: []

  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {

    this.loadUser(localStorage.getItem("userID"));
  };

  // Loads all User  and sets them to this.state.User
  loadUser = (id) => {
    API.getBook(id)
      .then(res => {
        console.log(res.data)
        this.setState({ user: res.data, username: res.data.username, realname: res.data.realname, photo: res.data.photo, gender: res.data.gender, currentuserID: res.data._id, userFriends: res.data.friends, userVideos: res.data.posts, })
        console.log(this.state.user)
        this.loadFriends();
        //this.loadVideos(res.data.posts)
       
        


      })
      .catch(err => console.log(err));

  };

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({
          users: res.data, username: "", realname: "", photo: "", gender: "",
          password: "",
        })
        
        
        console.log(this.state.users)
        var noCurrentUser = this.state.users
        for (var i = 0; i < noCurrentUser.length; i++){
          if (localStorage.getItem("userID") == noCurrentUser[i]._id)
          {
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
  
  loadVideos = (videoArr) => {
    console.log(videoArr)
    for (var i = 0; i < videoArr.length; i++) {
      var query;
      if (query) {
        query = query + videoArr[i] + ",";
      }
      else {
        query = videoArr[i] + ",";
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


        console.log(this.state.users)
        var userFriendObjs = []
        for (var i = 0; i < this.state.users.length; i++) {
          if (this.state.userFriends.includes(this.state.users[i]._id)) {
            userFriendObjs.push(this.state.users[i])
          }

        }
        this.setState({ userFriendObjs: userFriendObjs })
        this.getFriendsVideos()
      

      })
      .catch(err => console.log(err));
  };

  handleBtnPlay = id => {
    console.log(id)
    this.setState({ currentVideoID: id, show: true })
  };


  checkFriend = (id) => {
    if (this.state.userFriends.includes(id)){
      return true;
    }
    else{
      return false;
    }

  }

  handleFriends = friendID => {
    console.log(friendID);
    var userID = localStorage.getItem("userID")

    if (this.checkFriend(friendID)){
      API.removeFriend(userID, friendID)
      .then(res => { 
        
      this.loadBooks();
        console.log(res)
     
      })
      //console.log(this.state.users)
      .catch(err => console.log(err));
      console.log(this.state.users)
    }
    else{
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


  getFriendsVideos = () => {
      var newVideoFeed = []
        console.log(newVideoFeed)
        for (var i = 0; i < this.state.userFriendObjs.length; i++) {
          console.log(this.state.userFriendObjs[i].posts)
          var userFriendVideos = this.state.userFriendObjs[i].posts;
          console.log(userFriendVideos)
          if(userFriendVideos){
            for (var x = 0; x < userFriendVideos.length; x++) {
              console.log(userFriendVideos[x])
              if (!newVideoFeed.includes(userFriendVideos[x])) {
                newVideoFeed.push(userFriendVideos[x])
              }
            }
          }
        }
        console.log(newVideoFeed);
        
       var userVideoFeed =  this.state.user.posts

       var totalVideoFeed = userVideoFeed.concat(newVideoFeed)
       console.log(totalVideoFeed)
     var uniqueVideoArray = totalVideoFeed.filter(function(item, pos) {
        return totalVideoFeed.indexOf(item) == pos;
    })
       this.loadVideos(uniqueVideoArray)
  };

  alreadySaved = (id) => {
    console.log(this.state.user.posts)

    if (this.state.user.posts.includes(id)) {
      return true;
    }
    else {
      return false;
    }

  };

  getVideoUsers = (id) => {
    var users = "";
    if(this.state.user.posts.includes(id)){
      users = users + "You" + ", "
    }
    for (var i = 0; i < this.state.userFriendObjs.length; i++) {
      if(this.state.userFriendObjs[i].posts.includes(id)){
        users = users + this.state.userFriendObjs[i].username + ", "
      }
    }
  
   return users;
  
  };

  handleBtnSave = (videoID) => {
    // for (var i = 0; i < this.state.apiResults.length; i++) {
    //   if (this.state.apiResults[i].id.videoId == videoID) {
    //     var vidToSave = this.state.apiResults[i];
    //   }
    // }
    // event.preventDefault();
    var userID = localStorage.getItem("userID")
    if (this.alreadySaved(videoID)) {
      API.removeVideo(userID, videoID)
        .then(res => {

          this.loadUser(userID);
          console.log(res)

        })
        //console.log(this.state.users)
        .catch(err => console.log(err));
      console.log(this.state.users)
    }
    else {
      API.addVideo(userID, videoID)
        .then(res => {

          this.loadUser(userID);
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
          <h1>Welcome {this.state.user.username}! </h1>

        </Hero>
        <br></br>
        <Container fluid>
          <Row>

            <Col size="md-3">

              <Subtitle data="My Profile"></Subtitle>

              <ProfileCard
                id={this.state.user._id}
                key={this.state.user._id}
                name={this.state.user.username}
                image={this.state.user.photo}
                realname={this.state.user.realname}
                gender={this.state.user.gender}

              />

            </Col>

            <Col size="md-7">
              <Subtitle data="My Video Feed"></Subtitle>

              <Modal show={this.state.show} handleClose={this.hideModal}>

                <YouTube videoId={this.state.currentVideoID}
                  onReady={this._onReady}></YouTube>
              </Modal>
              {this.state.userVideoObjs.length ? (

                <VideoBox className="video-container">

                  {this.state.userVideoObjs.map(result => (

                    <HomeVideoCard image={result.snippet.thumbnails.high.url}
                      title={result.snippet.title}
                      trimmedTitle = {this.trimmedTitle}
                      key={result.id}
                      id={result.id}
                      handleBtnPlay={this.handleBtnPlay}
                      handleBtnSave={this.handleBtnSave}
                      alreadySaved={this.alreadySaved}
                      getVideoUsers={this.getVideoUsers}
                    >
                    </HomeVideoCard>

                  ))}





                </VideoBox>
              ) : (
                  <h3></h3>
                )}
            </Col>

            <Col size="md-2">
              <Subtitle data="Vriends"></Subtitle>


              {this.state.userFriendObjs.map(user => {
                return (

                   <FriendsList handleFriends = {this.handleFriends} checkFriend = {this.checkFriend} id={user._id} image={user.photo} name={user.username} userId={"/otheruser/" + user._id}></FriendsList> 

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
