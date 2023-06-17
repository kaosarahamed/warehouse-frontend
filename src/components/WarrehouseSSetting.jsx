import Style from '../styles/WarehouseSetting.module.css';
import { useEffect, useState } from 'react';
import global from '../styles/Global.module.css';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
const WarrehouseSSetting = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        username : "",
        password : ""
    });
const { username} = users;
const [response, setresponse] = useState("");
const [loading, setLoading] = useState(false);
const [notify, setnotify] = useState(false);
const id = localStorage.getItem("warehouseId");
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        await axios.patch(`http://localhost:4000/warehouseuser/${id}`, users).then((res) => {
                setresponse(res.data.message);
                setLoading(false)
            }).catch((err) => {
                setresponse(err.response.data.message);
                setLoading(false)
            });
            getUser(id)

    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:4000/warehouseuser/${id}`).then((res)=> {
            setresponse(res.data.message)
        }).catch((err) => {
            setresponse(err.response.data.message)
        });
        localStorage.removeItem("warehouseusername");
        localStorage.removeItem("warehousetoken");
        localStorage.removeItem("warehouseId");
        setTimeout(() => {
            navigate("/")
        }, 2000);
    }

    const getUser = async (id) => {
        await axios.get(`http://localhost:4000/warehouseuser/${id}`).then((res) => {
            setUsers(res.data)
        }).catch((err) => {
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
        <div className={Style.warehouseSetting}>
            {response && <div className={`${global.notification} ${
        notify && `${global.active}`}`}>
          <h3>{response}</h3>
          <RxCross2 onClick={() => {setnotify(true)}}/>
          </div>}
                    <h2>Edit warehouse setting</h2>
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

export default WarrehouseSSetting;