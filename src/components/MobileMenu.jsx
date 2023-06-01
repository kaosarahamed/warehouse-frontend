import { Link, useNavigate } from "react-router-dom";
import Style from "../styles/Mobilemenu.module.css";
import PropTypes from 'prop-types';

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

  return (
    <div className={`${Style.Mobilemenu} ${
      props.menu ? `${Style.active}` : `${Style.inactive}`
    }`} ref={props.menuref}>
        <div className={Style.menuNav}>
          <ul>
          { warehouseUser || csruser ? null : <li onClick={() => props.setMenu(!props.menu)}><Link to="/">Home</Link></li>}
              <li onClick={() => props.setMenu(!props.menu)}><Link to="/warehouse">Warehouse</Link></li>
              <li onClick={() => props.setMenu(!props.menu)}><Link to="/csr">CSR</Link></li>
              {warehouseUser || csruser? (
                        <>
                        <li onClick={() => props.setMenu(!props.menu)}><Link to="/dashboard">Dashboard</Link></li>
                        <li onClick={logut}><Link to="">Logout</Link></li>
                        </>
                    ) : null}
              {warehouseUser || csruser ? null : <li onClick={() => props.setMenu(!props.menu)}><Link to="/warehouseregistration">Create User</Link></li>}
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