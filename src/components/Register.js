import { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

const emailvalidation = RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname : "",
            lastname : "",
            typeofuser : "admin",
            email : "",
            password : "",
            errors : {
                firstname : "",
                lastname : "",
                email : "",
                password : ""
            }
        }
    }

    handleChange = ({target : {name, value}}) =>{
        
        const errors = this.state.errors;
    
        switch(name){
            case "firstname" : {
                if(value.length<1)
                  errors.firstname = "Please enter first name";
                else
                  errors.firstname = "";
                break;
            }
            case "lastname" : {
                if(value.length<1)
                  errors.lastname = "Please enter last name";
                else
                  errors.lastname = "";
                break;
            }
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

        }
        this.setState({[name] : value, errors});
    }
    
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state);
        this.registerUser();
    }

    registerUser = async()=>{
        try{
            console.log("register user called");
            const {status} = await axios.post("http://localhost:3001/users/register",{
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                typeofuser : this.state.typeofuser,
                email : this.state.email,
                password : this.state.password
            });

            if(status===200){
                window.alert("Registered Successfully");
               
            }else{
               // window.alert("");
            }
            
            this.setState({firstname : "", lastname : "", email : "", password : "" });
            
        }catch(err){
            console.log("Error while registering");
        }
    }

    render(){
        return(
            <div className = "RegistrationForm">
                <h1>Registration Page</h1>
                <form onSubmit = {this.handleSubmit}>

                    <div className = "InputField">
                        <label htmlFor = "firstname">First Name</label><br/>
                        <input type = "text" 
                        name = "firstname"
                        value = {this.state.firstname}
                        onChange = {this.handleChange}/>
                        <br/>
                        <span>{this.state.errors.firstname}</span>
                    </div>

                    <div className = "InputField">
                        <label htmlFor = "lastname">Last Name</label><br/>
                        <input type = "text" 
                        name = "lastname"
                        value = {this.state.lastname}
                        onChange = {this.handleChange}/>
                        <br/>
                        <span>{this.state.errors.lastname}</span>
                    </div>

                    <div className = "InputField">
                        <label htmlFor = "typeofuser">Type of User</label>
                        <select name = "typeofuser" onChange = {this.handleChange}>
                            <option value = "admin">Admin</option>
                            <option value = "manager">Manager</option>
                            <option value = "employee">Employee</option>
                        </select>
                    </div>

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

export default Register;