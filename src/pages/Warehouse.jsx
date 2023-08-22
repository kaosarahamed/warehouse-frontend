import Style from '../styles/Warehouse.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
const Warehouse = () => {

const navigate = useNavigate();
    const [packages, setPackages] = useState({
        tracking : "",
        rma : "",
        upc : "",
        sn : "",
        quantity : "",
        snmatched : "",
        condition : "",
        note : ""
    });
    const [products, setProducts] = useState([]);
    const [response, setresponse] = useState("");
    const {tracking, rma, upc, sn, quantity, snmatched, condition, note} = packages;
    const [getpackages, setgetPackages] = useState([]);
    const getAPiPackages = async () => {
        await axios.get(`${API_URL}packages`).then((res) => {
            setgetPackages(res.data.packages)
        }).catch((err) => {
            setresponse(err.response.data.message)
        })
    }
    const handleChange = (e) => {
        setPackages({
            ...packages, [e.target.name] : e.target.value
        })
    }
    const handleKeyDown = (event) => {
        
       if(event.target.value.length > 0){
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
          }
       }
            
      };
    const getProducts = async () => {
        await axios.get(`${API_URL}products`).then((res) => {
            setProducts(res.data.products)
        }).catch((err) => {
            setresponse(err.response.data.message)
        })
    }
    
    console.log(API_URL);
    
    useEffect(() => {
        getProducts();
        getAPiPackages();
    },[])

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const filterData = products.filter((item) => item.upc === upc);
        const newDatas = []
        for(let i = 0; i < filterData.length; i++){
            newDatas.push(Object.assign(filterData[i], packages)) 
        }
        const jsonDatas = JSON.stringify(newDatas);
        const dataFilter = getpackages.filter((item) => item.upc === upc);
        if(dataFilter.length > 0){
            setresponse("UPC Already Exisist")
            setPackages({
                tracking : "",
            rma : "",
            upc : "",
            sn : "",
            quantity : "",
            snmatched : "",
            condition : "",
            note : ""
            });
        }else if(tracking.length === 0 || rma.length === 0 || upc.length === 0 || sn.length === 0 || quantity.length === 0 || snmatched.length === 0 || condition.length === 0 || note.length === 0){
            setresponse("Please fill the form")
        }else if(filterData.length === 0){
            setresponse("UPC Data Does Not Match")
        }else{
            await axios.post(`${API_URL}packages`, jsonDatas, {
            headers : {
                "Content-Type" : 'application/json'
            }
        }).then(res => setresponse(res.data.message)).catch(err => setresponse(err.response.data.message));
        setPackages({
            tracking : "",
        rma : "",
        upc : "",
        sn : "",
        quantity : "",
        snmatched : "",
        condition : "",
        note : ""
        });
        setTimeout(() => {
            navigate("/dashboard/packages")
        }, 3000);
        }
        

    }
    return (
    <>
     {localStorage.getItem("warehouseusername") && <section className={Style.warehouse}>
        <div className={Style.warehouseContainer}>
            {response && <h3>{response}</h3>}
            <h2>Enter Package info</h2>
            <form>
                <div className={Style.formBox}>
                <div className={Style.leftBox}>
                <div className={Style.formField}>
                    <label htmlFor="trackingNumber">Tracking</label>
                <span>
                    <input onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} value={tracking} type="number" name="tracking" placeholder="Enter tracking" id="trackingNumber"/>
                </span>
                </div>
                <div className={Style.formField}>
                    <label htmlFor="rmaNumber">RMA</label>
                <span>
                    <input onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} value={rma} type="number" name="rma" id="rma" placeholder="Enter rma"/>
                </span>
                </div>
                <div className={Style.formField}>
                    <label htmlFor="upc">UPC</label>
                <span>
                    <input onKeyDown={handleKeyDown} onChange={handleChange} value={upc} type="text" name="upc" id="upc" placeholder="Enter upc"/>
                </span>
                </div>
                <div className={Style.formField}>
                    <label htmlFor="upc">SN</label>
                <span>
                    <input onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} value={sn} type="text" name="sn" id="sn" placeholder="Enter sn"/>
                </span>
                </div>
                </div>
                <div className={Style.rightBox}>
                <div className={Style.formField}>
                    <label htmlFor="quantity">Quantity</label>
                <span>
                    <input onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} value={quantity} type="number" name="quantity" id="quantity" placeholder="Enter quantity"/>
                </span>
                </div>
                <div className={Style.formField}>
                    <label htmlFor="snMatched">SN Matched</label>
                <span>
                    <select onKeyDown={handleKeyDown} name="snmatched" id="snMatched" value={snmatched} onChange={(e) => handleChange(e)}>
                    <option value="">Select One</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    </span>
                </div>
                <div className={Style.formField}>
                    <label htmlFor="condition">Condition</label>
                <span>
                    <select onKeyDown={handleKeyDown} name="condition" id="condtion" value={condition} onChange={(e) => handleChange(e)}>
                        <option value="">Select One</option>
                        <option value="new">New</option>
                        <option value="openBoxed">Open Boxed</option>
                        <option value="used">Used</option>
                        <option value="problematic">Problematic</option>
                    </select>
                </span>
                </div>
                <div className={Style.formField}>
                    <label htmlFor="note">Note</label>
                <span>
                    <input type="text" onKeyDown={handleKeyDown} placeholder="Enter note" onChange={(e) => handleChange(e)} value={note} name="note" id="node" />
                    
                </span>
                </div>
                </div>
                </div>
                <button type="button" onClick={handleSubmit}>Create</button>
            </form>
        </div>
    </section>}
     
    </>
    );
};

export default Warehouse;