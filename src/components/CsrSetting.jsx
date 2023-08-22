import Style from '../styles/CsrSetting.module.css';
import { useEffect, useState } from 'react';
import global from '../styles/Global.module.css';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;
const CsrSetting = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState({
        username : "",
        password : ""
    });
const { username} = users;
const [response, setresponse] = useState("");
const [loading, setLoading] = useState(false);
const [notify, setnotify] = useState(false);
const id = localStorage.getItem("csrId");
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        await axios.patch(`${API_URL}${id}`, users).then((res) => {
                setresponse(res.data.message);
                setLoading(false)
            }).catch((err) => {
                setresponse(err.response.data.message);
                setLoading(false)
            });
            getUser(id)
        }

        

    const deleteUser = async (id) => {
        await axios.delete(`${API_URL}${id}`).then((res)=> {
            setresponse(res.data.message)
        }).catch((err) => {
            setresponse(err.response.data.message)
        });
        localStorage.removeItem("csrusername");
        localStorage.removeItem("csrtoken");
        localStorage.removeItem("csrId");
        setTimeout(() => {
            navigate("/")
        }, 2000);
    }

    const getUser = async (id) => {
        await axios.get(`${API_URL}${id}`).then((res) => {
            setUsers(res.data)
        }).then((err) => {
            setresponse(err.response.data.message)
        });
        setLoading(false);
    }

    const handleChange = (e) => {
        setUsers({...users, [e.target.name] : e.target.value})
    }

    useEffect(() => {
        getUser(id)
    },[id])

    return (
        <div className={Style.csrSetting}>
            {response && <div className={`${global.notification} ${
        notify && `${global.active}`}`}>
          <h3>{response}</h3>
          <RxCross2 onClick={() => {setnotify(true)}}/>
          </div>}
                    <h2>Edit CSR setting</h2>
                    <form onSubmit={handleSubmit}>
                        <span>
                            <FaUser />
                            <input required value={username || ""} type="text" name="username" placeholder="Edit username" id="username" onChange={(e) => handleChange(e)}/>
                        </span>
                        <span>
                        <FaLock />
                            <input required type="password" name="password" id="password" placeholder="Edit password" onChange={(e) => handleChange(e)}/>
                        </span>
                        <div className={Style.formFooter}>
                        <button type="submit">{loading ? "Loading..." : "Save Setting"}</button>
                        <Link onClick={() => deleteUser(id)}>Delete Account</Link>
                        </div>
                    </form>
                </div>
    );
};

export default CsrSetting;