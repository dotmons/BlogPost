const BlogPost = require('./../models/BlogPost');

module.exports = async (req, res) => {
  
    //const blogposts = await BlogPost.find({})
    const blogposts = await BlogPost.find({}).populate('userid');
    res.render('index', { blogposts: blogposts });
  }

