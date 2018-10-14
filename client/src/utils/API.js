import axios from "axios";
const youTuBeApiKey = "AIzaSyCy2Pkt1JzTyRV-mhGHqpARFbovXj-auME";

// Constructing a queryURL using the API
const querySearchURL = "https://www.googleapis.com/youtube/v3/search?" +
  "&part=snippet" +
  "&type=video" +
  "&q=";

const querySearchURL2 = "&maxResults=10" +
  "&key=" +
  youTuBeApiKey;

const queryMultiSearchURL = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id="


const queryMultiSearchURL2 =
  "&key=" +
  youTuBeApiKey;




export default {
  searchAPI: function (queryState, query) {
    console.log(query)
    if (queryState == "search") {
      console.log(query)
      return axios.get(querySearchURL + query + querySearchURL2);
    }

    if (queryState == "multiSearch") {
      console.log(query)
      return axios.get(queryMultiSearchURL + query + queryMultiSearchURL2);
    }
  },


  addFriend: function (userID, friendID) {
    return axios.put("/api/books/addFriend/" + userID + "/" + friendID);
  },

  removeFriend: function (userID, friendID) {
    return axios.delete("/api/books/removeFriend/removeFriend/" + userID + "/" + friendID);
  },

  addVideo: function (userID, videoID) {
    return axios.put("/api/books/user/addVideo/addVideo/" + userID + "/" + videoID);
  },

  removeVideo: function (userID, videoID) {
    return axios.delete("/api/books/user/removeVideo/removeVideo/removeVideo/" + userID + "/" + videoID);
  },

  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  getBookName: function (username) {
    return axios.get("/api/books/name/" + username);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  }
};
