const BlogPost = require('./../models/BlogPost');

const path = require('path');

module.exports = (req, res) => {
   uploadImageCreateBlogPost(req);
  res.redirect('/index');
}


async function uploadImageCreateBlogPost(req) {
  //Define what to do with received data?
  try {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '../public/img', image.name))
    const blogpost = await BlogPost.create({
      ...req.body, image: '/img/' + image.name,
      userid: req.session.userId
    })
  } catch (error) {
    //handle error
    console.log(error)
  }
}