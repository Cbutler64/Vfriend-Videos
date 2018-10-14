const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

router.route("/name/:username")
.get(booksController.findByName);
 
// Matches with "/api/books/:id"
router.route("/:id")
  .get(booksController.findById)
  // .delete(booksController.remove);

  router.route("/addFriend/:userID/:friendID")
  .put(booksController.addFriend)
  router.route("/removeFriend/removeFriend/:userID/:friendID")
  .delete(booksController.removeFriend)

   router.route("/user/addVideo/addVideo/:userID/:videoID")
   .put(booksController.addVideo)

   router.route("/user/removeVideo/removeVideo/removeVideo/:userID/:videoID")
   .delete(booksController.removeVideo)
module.exports = router;
