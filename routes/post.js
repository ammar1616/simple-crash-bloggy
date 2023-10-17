const router = require("express").Router()

const postController = require("../controllers/post")
const isAuth = require("../middlewares/isAuth")

router.post("/addpost", isAuth, postController.addpost)
router.get("/getposts", isAuth, postController.getposts)
router.put("/updatepost/:postId", isAuth, postController.updatepost)
router.delete("/deletepost/:postId", isAuth, postController.deletepost)

module.exports = router