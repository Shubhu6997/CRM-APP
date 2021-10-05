
const express = require("express");
const mongo = require("./mongo");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT = 3001;

(async()=>{

    try {

        //MongoDB connectivity
        await mongo.connect();
       
        const userRoute = require("./routes/users.routes");

        //Middleware to parse request body into JSON format
        app.use(express.json());

        //Added cors
        app.use(cors());

        //Common/Logging Middelware
        app.use((req, res, next)=>{
            console.log("Common Middleware is called");
            next();
        });

        //Routes
        app.use("/users", userRoute);

        //Auth Token Middleware
        app.use((req, res, next)=>{
            const token  = req.headers["auth-token"];
            if(token)
            {
                try {
                    //throw error if token is invalid
                    req.user = jwt.verify(token, "Guvi@202!");  
                    console.log(req.user);
                    next();
                } catch (error) {
                    res.sendStatus(401); 
                }
            }
            else
            {
                res.sendStatus(401);
            }
                
        })
       

        //Server Start
        app.listen(PORT, ()=>console.log(`Server started at ${PORT}`));

        
    } catch (error) {
        console.log("Error while starting server : ", error )
        
    }
    

})();


