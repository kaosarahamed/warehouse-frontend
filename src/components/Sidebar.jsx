import Style from '../styles/Dashboard.module.css';
import {Link, useNavigate} from "react-router-dom";
import { FaTable, FaThLarge, FaCloudUploadAlt, FaCog, FaUserPlus, FaBoxOpen} from "react-icons/fa";
const Sidebar = () => {

    const navigate = useNavigate();
    const warehouseUser = localStorage.getItem("warehouseusername");
    const csruser = localStorage.getItem("csrusername");
    const warehouselogout = () => {
        localStorage.removeItem("warehouseusername");
        localStorage.removeItem("warehousetoken");
        localStorage.removeItem("warehouseId");
        localStorage.removeItem("csrusername");
        localStorage.removeItem("csrtoken");
        localStorage.removeItem("csrId");
        navigate("/warehouseregistration")
    }
    return (
        <div className={Style.dashboardNav}>
            <div className={Style.dashboardLogo}>
                <p>WH</p>
                <Link to="/dashboard" className={Style.mainLogo}>Warehouse</Link>
            </div>
                <ul>
                    {warehouseUser && <li>
                        <FaThLarge />
                        <Link to="/dashboard/warehouse">Warehouse</Link>
                    </li>}
                    <li>
                        <FaBoxOpen />
                        <Link to="/dashboard/packages">Packages</Link>
                    </li>
                    <li>
                        <FaTable />
                        <Link to="/dashboard/csr">CSR</Link>
                    </li>
                        
                    {warehouseUser && <li>
                        <FaCloudUploadAlt />
                        <Link to="/dashboard/upload">Upload Products</Link>
                        </li>}
                    {warehouseUser && <li>
                        <FaCog />
                        <Link to="/dashboard/warehousesetting">Setting</Link></li>}
                        {csruser && <li>
                        <FaCog />
                        <Link to="/dashboard/csrsetting">Setting</Link></li>}
                    <li>
                        <FaUserPlus />
                        <Link onClick={warehouselogout}>Create User</Link>
                    </li>
                </ul>
            </div>
    );
};

export default Sidebar;