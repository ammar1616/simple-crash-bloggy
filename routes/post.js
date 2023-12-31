const router = require("express").Router()

const postController = require("../controllers/post")
const isAuth = require("../middlewares/isAuth")

router.post("/addpost", isAuth, postController.addpost)

router.get("/getposts", isAuth, postController.getposts)

router.get("/getpost/:postId",isAuth,postController.getpost)

router.put("/updatepost/:postId", isAuth, postController.updatepost)

router.delete("/deletepost/:postId", isAuth, postController.deletepost)

router.put("/like/:postId",isAuth,postController.like)

module.exports = router