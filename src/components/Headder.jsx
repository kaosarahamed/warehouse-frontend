import Style from '../styles/Header.module.css';
import { Link, useNavigate } from "react-router-dom"
import MobileMenu from "./MobileMenu"
import { useEffect, useRef, useState } from 'react';
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
const Headder = () => {

    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const menuref = useRef();
    useEffect(() => {
        let handeler = (e) => {
          if(menuref.current !== null){
            if (!menuref.current.contains(e.target)) {
              setMenu(false);
            }
          }else{
            return null
          }
        };
        document.addEventListener("mousedown", handeler);
      },[]);
    const warehouselogout = () => {
        localStorage.removeItem("warehouseusername");
        localStorage.removeItem("warehousetoken");
        localStorage.removeItem("warehouseId");
        localStorage.removeItem("csrusername");
        localStorage.removeItem("csrtoken");
        localStorage.removeItem("csrId");
        navigate("/")
    }

    const warehouseUser = localStorage.getItem("warehouseusername");
    const csruser = localStorage.getItem("csrusername");
    return (
        <header>
          
        <div className={Style.headerContainer}>
            <div className={Style.logo}>
            <Link to={warehouseUser ? "/dashboard/warehousesetting" : csruser ? "/dashboard/csrsetting" : null}>{warehouseUser || csruser}</Link>
            </div>
            <div className={Style.headerLogo}>
                <span>
                <p>WH</p>
                <Link to="/dashboard" className={Style.mainLogo}>Warehouse</Link>
                </span>
            </div>
            <div className={Style.menu}>
                <ul className={Style.mainMenu}>
                    {warehouseUser || csruser? (
                        <li onClick={warehouselogout}><Link to="">Logout</Link></li>
                    ) : null}
                    {warehouseUser || csruser ? null : <li><Link to="/warehouseregistration">Create User</Link></li>}
                </ul>
                <p className={Style.hamBurger} onClick={() => setMenu(!menu)}>{menu ? <RxCross2 /> : <RxHamburgerMenu />}</p>
                <MobileMenu menuref={menuref} menu={menu} setMenu={setMenu}/> 
            </div>
        </div>
    </header>
    );
};

export default Headder;