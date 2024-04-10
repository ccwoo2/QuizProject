const express = require("express")
const mongoose = require("mongoose")
const bcrypt =require("bcryptjs")
const passport =require("passport")
const LocalStrategy=require("passport-local").Strategy
const session =require("express-session")
const bodyParser =require('body-parser')
const cors = require("cors")



const app =express()

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized:false
  
}))
var authenticate =false
var authUsername = ""
app.use(cors())
app.use(bodyParser.json())


app.use(passport.initialize())
app.use(passport.session())



const PORT = 3001
const MONGOURL = "mongodb://localhost:27017/ProjectDatabase"
mongoose.connect(MONGOURL)
.then(()=>{console.log("connected to database")})
.catch((error)=>{console.log(error)})

// const questionSchema = new mongoose.Schema({
//     question:String,
//     choices:[String],
//     answer:Number
// })

const questionSchema = new mongoose.Schema({
  question:String,
  choices:[String],
  answer:Number,
  maker:String
})

const UserSchema = new mongoose.Schema({
    username:String,
    password:String
})

const questionModel = mongoose.model("questions", questionSchema)

const User= mongoose.model("User", UserSchema)

const isAuth =(req, res, next)=>{
  console.log(authenticate)
  console.log(req.session)
  console.log(req.session.authenticated)
  if(req.session.authenticated){
    next()
  }else{
    console.log("failed")
  }
}



passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        // Attempt to find the user by their username
        const user = await User.findOne({ username });
        
        if (!user) {
          return done(null, false); // If user not found, return false
        }
  
        // If user is found, compare the provided password with the hashed password in database
        if (await bcrypt.compare(password, user.password)) {

          
          return done(null, user); // If password matches, authenticate the user

        } else {
          return done(null, false); // If password doesn't match, return false
        }
      } catch (err) {
        done(err); // Handle errors
      }
    }
  ));


  // Serialize user to decide which data of the user object should be stored in the session
// Here, we are storing only the user id in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user to retrieve the user data from the session using the user id
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user); // The user object is attached to the request object as req.user
    });
  });

// Registration endpoint for new users

app.post('/register', async (req, res) => {
    try {
      // Hashing the user's password before saving it to the database
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // The second parameter is the salt round
      const existingUser = await User.findOne({username: req.body.username})
      if(existingUser){
        res.status(500).send('Error registering new user');
      }
      else{
        const user = new User({ username: req.body.username, password: hashedPassword });
        await user.save(); // Saving the new user to the database
        console.log("User registered");
        res.status(201).send('User registered'); // Sending a success response
      }
      
    } catch (err) {
      res.status(500).send('Error registering new user'); // Sending an error response in case of failure
    }
  });

  // Login endpoint
  // This uses the Passport Local Strategy for authentication.
  // If authentication is successful, the user will be logged in.

  app.post('/login', passport.authenticate('local'), (req, res) => {
      console.log("Login Successful ! ")
      const {username, password} = req.body
      req.session.user={
        username
      }
      req.session.authenticated =true 
      
      console.log(req.session)
      console.log(req.sessionID)
      console.log(req.session.user)
      authenticate =req.session.authenticated
      authUsername = req.session.user.username
      
      
    //   res.writeHead(302, {
    //     Location: 'http://localhost3000/dashboard'
    // });
    // res.end();
      res.redirect("http://localhost:3000/dashboard")
      
  });


  // Logout endpoint
  // This endpoint logs the user out and ends the session.
  app.get('/logout', (req, res) => {
    req.logout(); // Passport provides this method to log out
    console.log("User Logged out !")
    res.send('Logged out'); // Send success response
  });
  
  app.post("/submitQuestion" , async (req,res)=>{
    console.log(req.session)
    console.log(req.session.authenticated)
    if(authenticate){
      const newQuestion = new questionModel ({question:req.body.question ,choices:req.body.choices, answer:req.body.answer, maker:authUsername})
      await newQuestion.save()
      console.log("question", req.body.question)
      console.log("choices", req.body.choices)
      console.log("New question saved")
      res.json("New question submited")
    }else{
      res.status(401)
    }

    }
  )


app.get("/", (req,res)=>{
    res.send("success")
    console.log(req.session)
})



app.get("/getQuestions",async(req,res)=>{
    const questionData = await questionModel.find()
    res.json(questionData)
})


app.listen(PORT, ()=>{console.log(`app is running on ${PORT}`)})