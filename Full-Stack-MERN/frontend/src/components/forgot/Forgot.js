import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { NavLink, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import "./Forgot.css"


const Forgot=()=>{
  const {data,loading,error}=useFetch(`/users/`)
  const [credentials, setCredentials] = useState("");
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [email, setUseremail] = useState("");
  // setUseremail(element.useremail)   
  const navigate = useNavigate();

  const handleClick = async (e) => {
      e.preventDefault()
      data.forEach(element => {
        if((credentials)==(element.email)){
          setUserid(element._id)
          setUsername(element.username)
        }
      });
      alert("Connect Success!")   
    };

    const handleclick=async(e)=>{
      e.preventDefault()
      if(userid==""){
          alert("Email not found! please check your email and reconnect it again...")
      }else{
          alert("Email Connected! you can now reset your password")
          navigate("/forgotid",{state:{userid,username}}) ;
      };
    };
      
    return(
      <body className="regBody2">
        <div className="login1">
            <div className="lContainer">
                
                <span className="sp">Connect Your Email to Reset Password </span>
                
                <input type="text" className="lInput" placeholder="Email" id="email" onChange={(e)=>setCredentials(e.target.value)} />
               
                <button disabled={loading} onClick={handleClick} className="lButton97"> Connect Email</button>
                <button disabled={loading} onClick={handleclick} className="lButton97">Reset Password</button>              
            </div>
        </div>
        </body>
    );
};

export default Forgot;