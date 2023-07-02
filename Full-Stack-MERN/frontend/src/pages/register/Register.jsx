import React from "react";
import "./register.css"
import {useState} from "react"; 
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({})


    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);


    const handleUserame = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleCountry = (e) => {
        setCountry(e.target.value)
        setSubmitted(false);
    }

    const handleCity = (e) => {
        setCity(e.target.value);
        setSubmitted(false);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value)
        setSubmitted(false);
    }


    const handleClick = async e => {
      e.preventDefault()
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "upload")
      try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/25d6s9/image/upload", data);
            const {url} = uploadRes.data;
            const newUser = {
              username,email,password,country,city,phone, ...info,
              img: url,
            };
    
            await axios.post("/auth/register", newUser)
            setSubmitted(true)
            alert("Your Registration has been Successful!🎉");
            window.location.assign("/login")

          } catch (err) {
            console.log(err)
            alert("Error, please fill each field");
          };
        };

    return (
        <>
        <body className="regBody">
            <div className="register">
                <h1 className="reTitle">Register</h1>
                <div className="left1">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            
          </div>
              
                <label htmlFor="file">
                  <div id="iconss">
                  Profile picture: <DriveFolderUploadOutlinedIcon className="icon" />
                  </div>
                </label>

                <div className="inputs"> 

                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                     
                    <input onChange={handleUserame} className="rInput" type="text" id="username" placeholder="First Name"/>
                    <input onChange={handleEmail} type="email" id="email" className="rInput" placeholder="Email"/>
                    <input onChange={handlePassword} className="rInput" type="password"  id="password" placeholder="Password"/>
                    <input onChange={handleCountry} className="rInput" type="text"  id="country" placeholder="Country"/>
                    <input onChange={handleCity} className="rInput" type="text"  id="city" placeholder="City"/>               
                    <input onChange={handlePhone} className="rInput" type="text"  id="phone" placeholder="+12 439 867 89"/>
                </div>
                <div class="footer">
                    <button onClick={handleClick} type="submit" className="btn">Confirm</button>
                  </div>
              </div>   
          </body>
        </>
  );     
};

export default Register;