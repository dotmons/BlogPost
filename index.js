const express = require('express')
const app = new express()
//const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');

const flash = require('connect-flash');

const BlogPost = require('./models/BlogPost');
const validateMiddleware = require("./middleware/validateMiddleware");
const loginMiddleware = require("./middleware/loginMiddleware");


const newPostController = require('./controllers/create');
const homeController = require('./controllers/home');
const contactController = require('./controllers/contact');
const aboutController = require('./controllers/about');
const postController = require('./controllers/post');
const postPostController = require('./controllers/postStore');
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');
const registerPostController = require('./controllers/registerLogin');
const postIdController = require('./controllers/postId');
const loginUserPostController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');


// app settings
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);

app.use(express.static('public'))
app.use(fileUpload())
//app.use(express.json())
//app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash());

app.use(expressSession({
secret: 'my secret',
resave: true,
cookie: {maxAge: 500000},
saveUninitialized: false
}));


var mongoDbQuery = 'mongodb://localhost:27017/classwork';
mongoose.connect(mongoDbQuery, { useNewUrlParser: true });



app.get('/create',loginMiddleware,newPostController);
app.get('/index',loginMiddleware,homeController);
app.get('/',loginMiddleware,homeController);
app.get('/contact',contactController);
app.get('/post',postController);
app.get('/about',aboutController);
app.get('/login',loginController);
app.get('/register',registerController);
app.get('/post/:id', loginMiddleware, postIdController);
app.get('/logout',logoutController);




app.post('/posts/store',validateMiddleware,postPostController);
app.post('/posts/register',registerPostController);
app.post('/posts/loginUser',loginUserPostController);
/*
app.post('/posts/store', validateMiddleWare, (req, res) => {
  //console.log('Message: '+req.body);
  //console.log('Title is: '+ req.body.title);
  //console.log('Image is: '+ req.files.image);
  //console.log('Body is: ' + req.body.body);

   uploadImageCreateBlogPost(req);
  //createBlogPost(req);
  res.redirect('/index');
})
*/



//To create

async function createBlogPost() {
  try {
    const blogpost = await BlogPost.create({
      title: 'Testing application',
      body: 'This is a message to all students'
    });

    console.log(blogpost);
  } catch (error) {
    console.error(error);
  }
}
//createBlogPost();

async function createBlogPost(req) {
  try {
    const blogpost = await BlogPost.create(req.body);
    console.log(blogpost);
  } catch (error) {
    console.error(error);
  }
}

// async function uploadImageCreateBlogPost(req) {
//   //Define what to do with received data?
//   try {
//     let image = req.files.image;
//     image.mv(path.resolve(__dirname, 'public/img', image.name))
//     const blogpost = await BlogPost.create({
//       ...req, image: '/img/' + image.name
//     })
//   } catch (error) {
//     //handle error
//     console.log(error)
//   }

// }

//Find all objects and print out

async function findAllObjects() {
  try {
    const blogposts = await BlogPost.find({});
    console.log(blogposts);
  } catch (error) {
    console.log(error);
  }
}
//findAllObjects();









async function findByIdObjects() {
  try {
    var id = '650dce9b143796c7792e3a6e';
    const blogposts = await BlogPost.findById(id);
    console.log('Title:::'+blogposts);
  } catch (error) {
    console.log(error);
  }
}
//findByIdObjects();







async function findAndUpdateById() {
  try {
    const id = "650dce9b143796c7792e3a6e";
    const updatedBlogpost = await BlogPost.findByIdAndUpdate(id, { title: 'Updated title' });
    console.log(updatedBlogpost);
  } catch (error) {
    console.log(error);
  }
}


//findAndUpdateById();


// To delete object by ID

async function deleteObjectById() {
  try {
    const id = "651704ba290473d0f0dd97a7";
    const deletedBlogpost = await BlogPost.findByIdAndDelete(id);
    console.log(deletedBlogpost);
  } catch (error) {
    console.log(error);
  }
}
//deleteObjectById();


let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}

app.listen(port, (req, res) => {
  console.log('App listening on port 4000');
})

/*
app.get('/index', async (req, res) => {
  const blogposts = await BlogPost.find({})
  res.render('index', { blogposts: blogposts });
})


app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({})
  res.render('index', { blogposts: blogposts });
})


app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/post', (req, res) => {
  res.render('post');
})

app.get('/create', (req, res) => {
  res.render('create');
})



const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.body == null) {
    return res.redirect('/create');
  }
  next()
}

*/


//app.get('/post/:id',(req,res)=>{
//  res.render('post');
//})

app.get('/post/:id', async (req, res) => {
  console.log('req.params.id' + req.params.id);
  const blogpost = await BlogPost.findById(req.params.id)
  console.log(blogpost);
  res.render('post', { blogpost })
})

/*
const customMiddleWare = (
  req, res, next) => {
  console.log('Custom middle ware called')
  next()
}
app.use(customMiddleWare);
*/