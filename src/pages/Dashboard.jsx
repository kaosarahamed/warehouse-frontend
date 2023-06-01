import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Style from "../styles/Dashboard.module.css";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();
    const warehouseusername = localStorage.getItem("warehouseusername");
    const csrusername = localStorage.getItem("csrusername");
    
    useEffect(() => {

        if(!warehouseusername && !csrusername){
            navigate("/")
        }
    },[warehouseusername,csrusername , navigate])


    return (
        <div className={Style.dashboard}>
        <div className={Style.dashboardContainer}>
            <Sidebar />
            <div className={Style.dashboardContent}>
            <Outlet/>
            </div>
        </div>
    </div>
    );
};

export default Dashboard;