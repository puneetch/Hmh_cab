const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
require("./db/conn");      
const Register = require("./models/registers");                // call registers.js page
const { json } = require('express');

const port = process.env.PORT || 3000;   

const static_path = path.join(__dirname, '../public');
const templates_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.json());                                       //get input value from register form
app.use(express.urlencoded({extended:false}));                 //get input value from register form

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render("index")
});
app.get('/register', (req, res) =>{
    res.render('register')
})

app.get('/home', (req, res) =>{
    res.render('home')
})

app.post('/register', async (req, res) =>{                       // return promise so use async/try
    try{
        // res.send(req.body.fullName);
        const password = req.body.password;
        const confPassword = req.body.confPassword;

        if(password === confPassword){
            const registerCustomer = new Register({
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                password:password,
                confPassword:confPassword,
               agreeTerm:req.body.agreeTerm
            })
           const registered =  await registerCustomer.save();
           res.status(201).redirect("/")
        }else{
            res.send("password are not matching")
        }

    }catch(error){
        res.status(400).send(error);
    }
})

//login  page configuration
app.post('/', async (req, res) => {
  try{
      debugger
    const phoneNumber = req.body.phone;
    const password = req.body.password;
    console.log("phoneNumber ", phoneNumber, "password: ", password);     // user login input value
    
    const userNumber = await Register.findOne({phone:phoneNumber})     //which data match with login number that document will return
    //res.send(userNumber)    
    console.log('userNumber', userNumber.phone, 'userPassword', userNumber.password)
    if(userNumber.password === password){
        res.status(201).redirect('home')
    }

  }catch(error){
    res.status(400).send("invalid login Number")
  }
});

app.listen(port, ()=> {
    console.log(`server is running ${port}`)
});