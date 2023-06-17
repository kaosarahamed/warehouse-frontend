import { useEffect, useState } from 'react';
import Style from '../styles/Global.module.css';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { FaUser, FaLock } from "react-icons/fa";
const CsrLogin = () => {



    const warehouseusername = localStorage.getItem("warehouseusername");
    const csrusername = localStorage.getItem("csrusername");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(warehouseusername || csrusername){
            navigate("/dashboard")
        }
    },[warehouseusername,csrusername , navigate])


    const [users, setUsers] = useState({
        username : "",
        password : ""
    });
const { username,password} = users;
const [response, setresponse] = useState("");
const [loading, setLoading] = useState(false);
const [notify, setnotify] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if(password.length < 8){
            setresponse("Password Should Minimum 8 Character");
            setLoading(false)
        }else{
            await axios.post("http://localhost:4000/csruser/login", users).then((res) => {
                setresponse(res.data.message);
                localStorage.setItem("csrtoken", res.data.token);
                localStorage.setItem("csrusername", res.data.user.username);
                localStorage.setItem("csrId", res.data.user._id)
                setLoading(false);
                setTimeout(() => {
                    navigate("/dashboard")
                }, 3000);
            }).catch((err) => {
                setresponse(err.response.data.message);
                setLoading(false)
            });
            setUsers({
                username : "",
                password : ""
            });
            
        }
    }


    const handleChange = (e) => {
        setUsers({...users, [e.target.name] : e.target.value})
    }


    return (
        <section>
        <div className={Style.container}>
        {response && <div className={`${Style.notification} ${
        notify && `${Style.active}`}`}>
          <h3>{response}</h3>
          <RxCross2 onClick={() => {setnotify(true)}}/>
          </div>}
          <Link to="/" className={Style.logo}>WH</Link>
            <h2> CSR User Login</h2>
            <form onSubmit={handleSubmit}>
            <span>
            <FaUser />
                <input required value={username} type="text" name="username" placeholder="Enter username" id="username" onChange={(e) => handleChange(e)}/>
            </span>
            <span>
            <FaLock />
                <input required value={password} type="password" name="password" id="password" placeholder="Enter password" onChange={(e) => handleChange(e)}/>
            </span>
                <button type="submit">{loading ? "Loading..." : "CSR Login"}</button>
                <div className={Style.formFooter}>
                <Link to="/">Warehouse Login</Link>
                <p>|</p>
                <Link to="/csrregistration"> Create Account</Link>
            </div>
        </form>
        </div>
    </section>
    );
};

export default CsrLogin;