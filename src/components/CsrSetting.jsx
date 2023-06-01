import Style from '../styles/Dashboard.module.css';
import { useEffect, useState } from 'react';
import global from '../styles/Global.module.css';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
const CsrSetting = () => {
    // const navigate = useNavigate();
    // const warehouseUser = localStorage.getItem("warehouseusername");
    // const csrUser = localStorage.getItem("csrusername");

    // useEffect(() => {
    //     if(warehouseUser || csrUser){
    //         navigate("/dashboard/warehousesetting")
    //     }
    // },[warehouseUser, navigate, csrUser])
    
    const [users, setUsers] = useState({
        username : "",
        password : ""
    });
const { username,password} = users;
const [response, setresponse] = useState("");
const [loading, setLoading] = useState(false);
const [notify, setnotify] = useState(false);
const id = localStorage.getItem("csrId");
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        await axios.patch(`http://localhost:4000/csruser/${id}`, users).then((res) => {
                setresponse(res.data.message);
                setLoading(false)
            }).catch((err) => {
                setresponse(err.response.data.message);
                setLoading(false)
            });
            getUser(id)
        }

        console.log(username);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:4000/csruser/${id}`).then((res)=> {
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
        await axios.get(`http://localhost:4000/csruser/${id}`).then((res) => {
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
                            <label htmlFor="username">Edit Username</label>
                            <input required value={username || ""} type="text" name="username" placeholder="Edit username" id="username" onChange={(e) => handleChange(e)}/>
                        </span>
                        <span>
                            <label htmlFor="password">Edit Password</label>
                            <input required value={password || ""} type="password" name="password" id="password" placeholder="Edit password" onChange={(e) => handleChange(e)}/>
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