
const db = require("../mongo");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const services = {
    async register(req, res){
        try {
            //Request body validation

            console.log("body",req.body);
            //Check EmailId exists or not
            const user  = await db.users.findOne({email : req.body.email});
            console.log(user);
            if(user)
                return res.status(400).send({error : "User already exists"});
            
            //Generate Salt 
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            console.log(req.body);

            //Insert user
            await db.users.insertOne(req.body);

            res.send({message : "User registered successfully"});        
            
        } catch (error) {
            console.log("Error while registering user : ", error);
            res.sendStatus(500);  
        }
    },

    async login(req, res){
        try {
            //Request body validation

            //Check EmailId exists or not
            console.log("Body",req.body);
            const user  = await db.users.findOne({email : req.body.email});
            console.log(user);
            if(!user)
                return res.status(400).send({error : "User does not exists"});

            //Compare password
            const isValid = await bcrypt.compare(req.body.password, user.password);
            console.log(isValid);

            if(!isValid)
                return res.status(403).send({error : "Email or Password Invalid"});
            
            //Generate Token
            const authToken = jwt.sign(
                {userId : user._Id, email : user.email},
                "Guvi@202!" 
            );

            console.log(authToken);

            res.send({authToken}); 
           
        } catch (error) {
            console.log("Error while login user : ", error);
            res.sendStatus(500);  
        }
    }  
}

module.exports = services;