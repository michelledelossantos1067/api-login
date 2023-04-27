const express  = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

const app = express();

app.use(express.urlencoded( {extended: true}));

app.use(cookieParser("mi ulta secreto"));
app.use(session({
    secret: 'mi ulta secreto',
    resave:true,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username,password,done){
    
    if(username === "codigofacilito@gmail.com" && password === "12345678")
    return done(null,{ id: 1, name: "Cody" });

    done(null, false);
}));


passport.serializeUser(function(user,done){
done(null,user.id);

});

passport.deserializeUser(function(id,done){
    done(null,{ id:1, name: "Cody"});
});

app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    //Si ya iniciamos mostrar bienvenida


    //Si no iniciamos vamos a rediccionar a /login
    res.send("hola")
});

app.get("/login",(req,res)=>{
    //Mostrar el formulario de login 
    res.render("login");

});
app.post("/login",passport.authenticate('local',{
    //Recibir credenciales e inical sesion
succcessRedirect:"/",
failureRedirect:"/"
}));

app.listen(4000, ()=> console.log("Server started"));