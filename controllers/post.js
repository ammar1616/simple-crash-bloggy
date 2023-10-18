const Post = require("../models/post")
const User = require("../models/user")

exports.getposts = async (req, res) => {
    try {
        let posts = await Post.find({}).populate('author', 'username -_id')
        res.json({ message: "All Posts", posts })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." })
    }
}

exports.getpost = async (req, res) => {
    try {
        const { postId } = req.params
        let posts = await Post.findById(postId)
        res.json({ message: "View only post", posts })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." })
    }
}

exports.addpost = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ error: "You must login to create a post" });
        }
        const user = await User.findById(userId).select("_id posts username")
        const { content } = req.body
        const post = new Post({ content, author: userId })
        await post.save()
        user.posts.push(post)
        await user.save()
        res.status(201).json({ message: "Post created successfully", post, author: user.username });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." })
    }

}

exports.updatepost = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ error: "You must login to create a post" });
        }
        const postId = req.params.postId
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(401).json({ error: "Post does not exist" });
        }
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You cannot update this post" });
        }
        const { content } = req.body;
        post.content = content || post.content
        await post.save();
        res.status(201).json({ message: "Post updated successfully", post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." })
    }

}

exports.deletepost = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ error: "You must login to create a post" });
        }
        const postId = req.params.postId
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(401).json({ error: "Post does not exist" });
        }
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this post" });
        }
        const user = await User.findById(req.user._id).select('posts');
        await Post.findByIdAndRemove(postId);
        user.posts.pull(postId);
        await user.save();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.like = async (req, res) => {
    try {
        const { postId } = req.params
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ error: "You must login to like a post" });
        }
        const post = await Post.findById(postId).select('likes')
        if (post.likes.includes(userId.toString())) {
            post.likes = post.likes.filter(id => !id.equals(userId));
            await post.save()
            return res.status(201).json({ error: "You unliked this post" });
        }
        post.likes.push(userId)
        await post.save()
        return res.status(201).json({ error: "You liked this post" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}