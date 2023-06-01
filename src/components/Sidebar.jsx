import Style from '../styles/Dashboard.module.css';
import {Link} from "react-router-dom";

const Sidebar = () => {

    const warehouseusername = localStorage.getItem("warehouseusername");
    const csrusername = localStorage.getItem("csrusername");

    return (
        <div className={Style.dashboardNav}>
                <h2>{warehouseusername || csrusername}</h2>
                <ul>
                    {warehouseusername && <li><Link to="/dashboard/warehousesetting">Edit Warehouse</Link></li>}
                    {csrusername && <li><Link to="/dashboard/csrsetting">Edit CSR</Link></li>}
                    {warehouseusername && <li><Link to="/dashboard/upload">Upload Products</Link></li>}
                </ul>
            </div>
    );
};

export default Sidebar;