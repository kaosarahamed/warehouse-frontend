import Style from "../styles/UpcTable.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from "./Pagination";
const API_URL = import.meta.env.VITE_API_URL;
const UpcTable = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postPages, setPostPages] = useState(10);
  const [getpackages, setgetPackages] = useState([]);
    const [response, setresponse] = useState("");
  const getAPiPackages = async () => {
    await axios.get(`${API_URL}packages`).then((res) => {
        setgetPackages(res.data.packages)
    }).catch((err) => {
        setresponse(err.response.data.message)
    })
}

useEffect(() => {
  getAPiPackages()
},[])



const lastIndex = currentPage * postPages;
const firstIndex = lastIndex - postPages;
const slicePost = getpackages.slice(firstIndex, lastIndex);




    return (
      <>
        <section className={Style.upcSection}>
        <div className={Style.upcContainer}>
            <h2>{response && response}</h2>
          <h1>Packages</h1>
            <div className={Style.upcTable}>
                <table>
                    <thead>
                    <tr>
                      <th>Package</th>
                      <th>Date</th>
                      <th>Tracking</th>
                      <th>RMA</th>
                      <th>UPC</th>
                      <th>SN</th>
                      <th>Quantity</th>
                      <th>SN Matched</th>
                      <th>Condition</th>
                      <th>Note</th>
                      <th>Item</th>
                      <th>SKU</th>
                      <th>length</th>
                      <th>Width</th>
                      <th>Height</th>
                      <th>Weight</th>
                    </tr>
                    </thead>
                    <tbody>
                    {slicePost ? slicePost.map((item, index) => {
                      return( 
                      <tr key={item._id}>
                      <td>{"P" + index}</td>
                      <td>{new Date(item.createdAt).getFullYear() + "-" + new Date(item.createdAt).getMonth() + "-" + new Date(item.createdAt).getDate()}</td>
                      <td>{item.tracking}</td>
                      <td>{item.rma}</td>
                      <td>{item.upc}</td>
                      <td>{item.sn}</td>
                      <td>{item.quantity}</td>
                      <td>{item.snmatched}</td>
                      <td>{item.condition}</td>
                      <td>{item.note}</td>
                      <td>{item.item}</td>
                      <td>{item.sku}</td>
                      <td>{item.length}</td>
                      <td>{item.width}</td>
                      <td>{item.height}</td>
                      <td>{item.weight}</td>
                    </tr>
                      )
                    }) : "Loading..."}
                    </tbody>
                    
                  </table>
            </div>
        </div>
    </section>
        <Pagination totalPosts={getpackages} postPerPage={postPages} setCurrentPage={setCurrentPage} currentPage={currentPage} setPostPages={setPostPages}/>
        </>
    );
};

export default UpcTable;

