import { Link, useNavigate } from "react-router-dom";
import Style from "../styles/Mobilemenu.module.css";
import PropTypes from 'prop-types';
import { FaTable, FaThLarge, FaCloudUploadAlt, FaCog, FaUserPlus, FaBoxOpen, FaExternalLinkAlt} from "react-icons/fa";
function MobileMenu(props) {
    
    const warehouseUser = localStorage.getItem("warehouseusername");
    const csruser = localStorage.getItem("csrusername");

  const navigate = useNavigate()
  const logut = () => {
    localStorage.removeItem("warehouseusername");
        localStorage.removeItem("warehousetoken");
        localStorage.removeItem("warehouseId");
        localStorage.removeItem("csrusername");
        localStorage.removeItem("csrtoken");
        localStorage.removeItem("csrId");
    navigate("/login")
    props.setMenu(!props.menu)
  }
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
    <div className={`${Style.Mobilemenu} ${
      props.menu ? `${Style.active}` : `${Style.inactive}`
    }`} ref={props.menuref}>
        <div className={Style.menuNav}>
          <ul>
          {warehouseUser && <li onClick={() => props.setMenu(!props.menu)}>
                        <FaThLarge />
                        <Link to="/dashboard/warehouse">Warehouse</Link>
                    </li>}

                    <li onClick={() => props.setMenu(!props.menu)}>
                        <FaBoxOpen />
                        <Link to="/dashboard/packages">Packages</Link>
                    </li>
                    <li onClick={() => props.setMenu(!props.menu)}>
                        <FaTable />
                        <Link to="/dashboard/csr">CSR</Link>
                    </li>
                    {warehouseUser && <li onClick={() => props.setMenu(!props.menu)}>
                        <FaCloudUploadAlt />
                        <Link to="/dashboard/upload">Upload Products</Link>
                    </li>}
                    {warehouseUser && <li onClick={() => props.setMenu(!props.menu)}>
                        <FaCog />
                        <Link to="/dashboard/warehousesetting">Setting</Link>
                      </li>}
                        {csruser && 
                        <li onClick={() => props.setMenu(!props.menu)}>
                        <FaCog />
                        <Link to="/dashboard/csrsetting">Setting</Link>
                        </li>}
                        <li>
                        <FaUserPlus />
                        <Link onClick={warehouselogout}>Create User</Link>
                        </li>
                    {warehouseUser ? <li onClick={logut}>
                      
                      <FaExternalLinkAlt />
                      <Link to="">Logout</Link></li> 
                       : csruser ? <li onClick={logut}><FaExternalLinkAlt /><Link to="">Logout</Link></li> : null }
                    
              
          </ul>
        </div>
    </div>
  )
}

MobileMenu.propTypes = {
    menu: PropTypes.any,
    menuref : PropTypes.any,
    setMenu : PropTypes.any
  }


export default MobileMenu;