const express = require('express')
const session = require('express-session')

const app = express();

// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,maxAge:60000 }
  }))

const auth=(req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        res.send("you are not loged in")
    }
}


// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.write('<p>views: ' + req.session.views + '</p>')

    res.end('welcome to the session demo. refresh!')
  }
})

app.get('/test',(req,res)=>{
    if(req.session.test){
        req.session.test++;
    }else{
        req.session.test=1;
    }
    res.send("hello session:"+req.session.test)
});



app.get('/login',(req,res)=>{
    if(req.query.name&& req.query.password){
        res.status(200);
        req.session.user=req.query.name;
        // res.setHeader('Content-Type', 'text/html');

        res.send("you are  loged in: "+req.session.user)
    }else{
    res.send("hello user please enter name and password in the link");}
    // const name =req.query.name;
    // const password=req.query.password;
    // res.send(name,password)
});
app.get('/user',auth,(req,res)=>{
    if(req.session.user){
        res.send(req.session.user);
    }else{
        res.status(404);
        console.log(res.status);
        res.send("NOt loged in")
    }

})
app.get('/logout',auth,(req,res)=>{
    req.session.destroy();
    res.status(200);
    res.send("loged out")
})

app.listen(5000,()=>{
    console.log("listening 5000")
})