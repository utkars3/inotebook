//form me onsubmit use karne ka faida hai ki ham yahi pe cheejo ko check kr sakte hai jaise ki required,min length

import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Signup = (props) => {
    let history=useNavigate();
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const host="http://localhost:4000"
    const handleSubmit= async (e)=>{

        //use kiye hai taki page reload na ho
        e.preventDefault();

        const {name,email,password}=credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify({name,email,password})

          });
          const json=await response.json();
          console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            history("/");
            props.showAlert("Account created successfully","success");
            
        }else{
            props.showAlert("Invalid Details","danger");
        }


    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
      }





  return (
    <div className="container my-3">
        <h2 >Create an account to use iNotebook</h2>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange}  aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange}  aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" required minLength={5} name="password" onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm  Password</label>
    <input type="password" className="form-control" id="cpassword" required minLength={5} name="cpassword" onChange={onChange} />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
