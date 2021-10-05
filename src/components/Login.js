import { Component } from "react";
import axios from "axios";

const emailvalidation = RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
                email : "",
                password : "",
                errors : {
                    email : "",
                    password : ""
                }
        }
        
    }
    handleChange = ({target : {name, value}}) =>{
        
        const errors = this.state.errors;
    
        switch(name){
            case "email" : {
            if(value.name<=5)
                errors.email = "email should be atleast 6 characters";
            else if (!emailvalidation.test(value)){
                errors.email = "Invalid Email";
            }else{
                errors.email = "";
            }
            break;
            }
            default : {
                console.log("Default case");
            }

        }
        this.setState({[name] : value, errors});
    }
    
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state);
        this.loginUser();
    }

    loginUser = async()=>{
        
        try{
            console.log("Login user called");
            const {status} = await axios.post("http://localhost:3001/users/login",{
                email : this.state.email,
                password : this.state.password
            });

            console.log("Response",status);
            if(status===200){
                window.alert("Logged Successfully");
            }else{
                window.alert("Invalid email or password");
            }
            
            this.setState({email : "", password : "" });
            
        }catch(err){
            console.log("Error while login");
        }
    }

    render(){
        return(
            <div className = "LoginForm">
                <h1>Login Page</h1>
                <form onSubmit = {this.handleSubmit}>

                    <div className = "InputField">
                        <label htmlFor = "email">Username(Email)</label><br/>
                        <input type = "email" 
                        name = "email"
                        value = {this.state.email}
                        onChange = {this.handleChange}/>
                        <br/>
                        <span>{this.state.errors.email}</span>
                    </div>

                    <div className = "InputField">
                        <label htmlFor = "password">password</label><br/>
                        <input type = "password" 
                        name = "password"
                        value = {this.state.password}
                        onChange = {this.handleChange}/>
                        <br/>
                        <span>{this.state.errors.password}</span>
                    </div>

                    <button type = "submit" onClick = {this.handleSubmit}>Log In</button>
               </form>
            </div>
        )
    }  
}

export default Login;