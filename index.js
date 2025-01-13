const express=require('express');
const path=require('path');
const bcrypt=require('bcrypt');
const collection=require('./config');
const { name } = require('ejs');


const app=express();
//convert to json formmat

app.use(express.json());

app.use(express.urlencoded({extended:false}))

//ejs view engine
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render("login");
});
app.get('/signup',(req,res)=>{
    res.render("signup");
});
//Register 
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    try {
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            return res.send('User already exists. Please choose a different username.');
        }

        // Password encryption
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; // Replace plain password 

        const userData = await collection.insertMany(data);
        console.log('User registered:', userData);
        res.redirect('/');  // Redirect 
    } catch (error) {
        res.status(500).send('Error registering user');
        console.error(error);
    }
});
//login user
app.post('/login', async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.username });
        if (!user) {
            return res.send('Username not found');
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);  // Corrected comparison
        if (isPasswordMatch) {
            res.render("home");  
        } else {
            res.send("Wrong details");
        }
    } catch (error) {
        res.status(500).send('Error logging in');
        console.error(error);
    }
});


const PORT=3000
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})