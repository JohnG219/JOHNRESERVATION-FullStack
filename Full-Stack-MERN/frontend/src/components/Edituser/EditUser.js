import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./Edituser.css"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";


const EditUser = () => {

const { user } = useContext(AuthContext);
const [file, setFile] = useState("");
const [info, setInfo] = useState({})
const [credentials1, setCredentials1] = useState({
    email:undefined,
    password:undefined,
    username:undefined,
    country:undefined,
    city:undefined,
    img:undefined,
    phone:undefined
});

const { loading, error, dispatch } = useContext(AuthContext);
const navigate = useNavigate();
//   Handle Change Function
const handleChange = (e) => {

  e.preventDefault()
  setCredentials1((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

//   Handle Click Function
 const handleClick = async (e) => {
 e.preventDefault()
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "upload")

 try {
  const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/25d6s9/image/upload", data);
  const { url } = uploadRes.data;
  const res = await axios.put(`/users/update/${user._id}`, { ...credentials1, img: url });
      alert("Credentials Update Success!");
      navigate("/login") 

      } catch (err) {
        console.log(err)
        alert("Profile picture and Old/New, password is required! the most efficient ways you can avoid being hacked");
      }; 
};
console.log(credentials1);

  return(
      <div className="login2">      
         <div className="lContainer13">

         <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.img ?user.img:"https://i.ibb.co/MBtjqXQ/no-avatar.gif"
              }
              alt=""
            />

            <label htmlFor="file">
                  <div id="iconsss">
                  Profile picture: <DriveFolderUploadOutlinedIcon className="icon" />
                  <p id="profi">required</p>
                  </div>
                </label>

                <div className="inputs"> 

                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />

         <button className="lButton300">
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Home
            </NavLink>
             
          </button>
                
            <span className="sp22">Update profile info,  {user.username} <br></br></span>
            
                <input type="username" className="lInput7" placeholder="Username" id="username" onChange={handleChange} />
                <input type="tel" className="lInput7" placeholder="Contact#" id="phone" onChange={handleChange} />
                <input type="text" className="lInput7" placeholder="Country" id="country" onChange={handleChange} />
                <input type="text" className="lInput7" placeholder="City" id="city" onChange={handleChange} />
                <input type="password" className="lInput7" placeholder="Password required" id="password" onChange={handleChange} required/>
                <input type="email" className="lInput7" placeholder="Email" id="email" onChange={handleChange} />
                <p id="oldpass">Required! type your old password or you can change your password as well.</p>
                
                <button disabled={loading} onClick={handleClick} className="lButton99">Submit</button>

              </div>
            </div>
        </div>
    );
};
export default EditUser;