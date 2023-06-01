import Style from '../styles/UpcForm.module.css';
import UpcTable from '../components/UpcTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Warehouse = () => {


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
    const [getpackages, setgetPackages] = useState([]);
    const [response, setresponse] = useState("");
    const {tracking, rma, upc, sn, quantity, snmatched, condition, note} = packages;
    

    const handleChange = (e) => {
        setPackages({
            ...packages, [e.target.name] : e.target.value
        })
    }
    const handleKeyDown = (event) => {
        console.log(event.target.value);
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
        await axios.get("http://localhost:4000/products").then((res) => {
            setProducts(res.data.products)
        }).catch((err) => {
            setresponse(err.response.data.message)
        })
    }
    const getAPiPackages = async () => {
        await axios.get("http://localhost:4000/packages").then((res) => {
            setgetPackages(res.data.packages)
        }).catch((err) => {
            setresponse(err.response.data.message)
        })
    }
    
    useEffect(() => {
        getProducts()
        getAPiPackages()
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const filterData = products.filter((item) => item.upc === upc);
        const newDatas = []
        for(let i = 0; i < filterData.length; i++){
             newDatas.push(Object.assign(filterData[i], packages)) 
        }
        const jsonDatas = JSON.stringify(newDatas);
        await axios.post("http://localhost:4000/packages", jsonDatas, {
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
        })
        getAPiPackages();
    }
    return (
    <>
     {localStorage.getItem("warehouseusername") && <section className={Style.warehouse}>
        <div className={Style.warehouseContainer}>
            <h2>Enter Package info</h2>
            <form>
                <span>
                    <label htmlFor="trackingNumber">Tracking</label>
                    <input onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} value={tracking} type="number" name="tracking" placeholder="Enter tracking" id="trackingNumber"/>
                </span>
                <span>
                    <label htmlFor="rmaNumber">RMA</label>
                    <input onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} value={rma} type="number" name="rma" id="rma" placeholder="Enter rma"/>
                </span>
                <span>
                    <label htmlFor="upc">UPC</label>
                    <input onKeyDown={handleKeyDown} onChange={handleChange} value={upc} type="text" name="upc" id="upc" placeholder="Enter upc"/>
                </span>
                <span>
                    <label htmlFor="upc">SN</label>
                    <input onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} value={sn} type="text" name="sn" id="sn" placeholder="Enter sn"/>
                </span>
                <span>
                    <label htmlFor="quantity">Quantity</label>
                    <input onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} value={quantity} type="number" name="quantity" id="quantity" placeholder="Enter quantity"/>
                </span>
                <span>
                    <label htmlFor="snMatched">SN Matched</label>
                    <select onKeyDown={handleKeyDown} name="snmatched" id="snMatched" value={snmatched} onChange={(e) => handleChange(e)}>
                    <option value="">Select One</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    </span>
                <span>
                    <label htmlFor="condition">Condition</label>
                    <select onKeyDown={handleKeyDown} name="condition" id="condtion" value={condition} onChange={(e) => handleChange(e)}>
                        <option value="">Select One</option>
                        <option value="new">New</option>
                        <option value="openBoxed">Open Boxed</option>
                        <option value="used">Used</option>
                        <option value="problematic">Problematic</option>
                    </select>
                </span>
                <span>
                    <label htmlFor="note">Note</label>
                    <textarea onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} value={note} name="note" id="node" cols="10" rows="3" placeholder="Enter note"></textarea>
                </span>
                <button type="button" onClick={handleSubmit}>Create</button>
            </form>
        </div>
    </section>}
     <UpcTable getpackages={getpackages} getAPiPackages={getAPiPackages} response={response}/>
    </>
    );
};

export default Warehouse;