const express = require('express'),
      app = express(),
      session = require('express-session'),
      passport = require('passport'),
      config = require('./config/config'),
      checkLogedIn = require('./config/checkLogedIn'),
      dotenv = require('dotenv').config(),
      mongoose = require('mongoose'),
      cors = require('cors'),
      quensCon = require('./controllers/Questions'),
      Students = require('./models/Students'),
      bcrypt = require('bcrypt'),
      URI = process.env.MONGOOS_URI,
      PORT = process.env.PORT || 2000;
      const { v4: uuidv4 } = require('uuid');

      // initialize passport middleare
      require('./config/facebook-auth')(passport);
      require('./config/local-auth')(passport);


      // establish mongodb connections
      mongoose.connect(URI,{
        useNewUrlParser:true
      }).then(()=>{
        console.log("mongodb is successfully connected");
      }).catch((err)=>{
        console.log(err)
      })
      //lift restriction of blockage from other origin
      app.use(cors({
        credentials:true,
        origin:'http://localhost:3000'}));

        // app.use(function(req, res, next) {
        //   // res.header("Access-Control-Allow-Origin", "*");
        //   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        //   res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
        //   next();
        // });
      // body parser
      app.use(express.json());
      app.use(express.urlencoded({extended: false}));
      // implement session storeage
     app.use(session({
       resave:true,
       saveUninitialized:true,
       secret: "SECRET"
     }))

     app.use(passport.initialize())
     app.use(passport.session())

     // main entry route for testing purpose
      app.get('/', (req,res)=>{
          res.send("hey your are an awsome dev any thing is working perfectly");
      })

      app.post('/register',(req,res)=>{
        const {email, password,name} = req.body;
        let err_msg = [];
        if(!email || !password || !name ){
            err_msg.push({msg:"please fill out the required fields"})
        }

        if(password.length < 4){
            err_msg.push({msg:"password must be 4 or more"})
        }

      Students.findOne({email:req.body.email}, {},(err, Student)=>{
          if(err) throw err;
          if(Student){
              console.log(`user with email ${Student.email} do exist`)
              err_msg.push({msg:`user with email ${Student.email} do exist`})
          }

          if(err_msg.length > 0){
            console.log(err_msg)
            res.json({
              fail:true,
              err_msg
            })

        }else{
         bcrypt.hash(req.body.password, 10, (err, hash)=>{
         if(err) throw err;
  const newStudent = new Students({
            email:req.body.email,
            password:hash,
            name:req.body.name,
            facebookId:uuidv4()

        });
        console.log(newStudent)
        /*saving to the database*/
     newStudent.save(function (err, saved) {
  // req.flash('success_msg', "you are now registered and can login");
        if(err) console.log(err);
        console.log(saved);
        res.json({fail:false})
          });
        /*end of the saving*/
        })
        }
      }
         );
      })

      app.post('/login',passport.authenticate('local'), (req, res, next) => {
          // if(req.user || req.session.user){
          //  return res.json({failLogin:false,
          //   Student:req.user})
          // }
          // // cons.log(req.message)
          // res.json({
          //   failLogin:true,
          // })
          req.session.save(()=>{
            if(req.user || req.session.user){
              return res.json({failLogin:false,
               Student:req.user})
             }
             // cons.log(req.message)
             res.json({
               failLogin:true,
             })
          })
        }
      )

      //establish facebook login system
      app.get('/auth/user/facebook', passport.authenticate('facebook',{
        scope:['public_profile', 'email']
      }))

      // route to be redirected when facebook succeeded
      app.get('/auth/facebook/callback',(req,res)=>{
        res.send('authentication done succefully')
      })

      // a protected route to check for authorization
      app.get('/user/courses', checkLogedIn, (req,res)=>{
        res.send("welcome to the quiz palace")
      } )

      app.post('/question/add',checkLogedIn, quensCon.addQuestion);

      app.get('/test/start/:category',checkLogedIn, quensCon.testQuest)

      app.listen(PORT, console.log('server is running on port'+ PORT));
