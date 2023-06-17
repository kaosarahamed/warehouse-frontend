import { useEffect, useState } from 'react';
import Style from '../styles/Csr.module.css';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { RiCloseCircleFill, RiCloseFill } from "react-icons/ri";
import Pagination from '../components/Pagination';
const Csr = () => {
  // All state 
  const [getpackages, setgetPackages] = useState([]);
  const [response, setresponse] = useState("");
  const [csrform, setCsrform] = useState(false);
  const [processform, setprocessform] = useState(false);
  const [processId, setprocessId] = useState();
  const [csrId, setcsrId] = useState();
  const [loading, setLoading] = useState(false);
  const [clearData, setClearData] = useState([]);
  const [filter, setFilter] = useState({
    filterdate : "",
    filtertracking : "",
    filterupc : "",
    filtercondition : ""
  });
  const [disable, setDisable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPages, setPostPages] = useState(10);
  const {filterdate, filtertracking, filterupc, filtercondition} = filter; 
  const username = localStorage.getItem("csrusername");
const [process, setprocess] = useState({
  processed : ""
});
const [csrnotes, setcsrnote] = useState({
  csrnote : ""
});
const {csrnote} = csrnotes
const processhandleChange = (e) => {
  setprocess({
      ...process, [e.target.name] : e.target.value
  })
}
const csrhandleChange = (e) => {
  setcsrnote({
      ...csrnote, [e.target.name] : e.target.value
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
  getAPiPackages()

},[response])
const editPackages = (id) => {
  setprocessId(id)
  setcsrId(id)
}
const clearFilter = () => {
  const allDatas = getpackages.map((item) => item);
  setFilter({
    filterdate : "",
    filtertracking : "",
    filterupc : "",
    filtercondition : ""
  })
  setClearData(allDatas);
}
const processhandleSubmit = async (e) => {
  setLoading(true)
  e.preventDefault();
  await axios.put(`http://localhost:4000/packages/${processId}`, process).then((res) => {
    setresponse(res.data.message)
    setLoading(false)
    setDisable(false)
  }).catch((err) => {
    setresponse(err.response.data.message)
    setLoading(false)
  });
  setprocessform(!processform);
  getAPiPackages()
}
const csrhandleSubmit = async (e) => {
  setLoading(true)
  e.preventDefault();
  await axios.put(`http://localhost:4000/packages/${csrId}`, csrnotes).then((res) => {
    setresponse(res.data.message)
    setcsrnote({
      csrnote : ""
    })
    setLoading(false)
  }).catch((err) => {
    setresponse(err.response.data.message)
    setLoading(false)
  });
  setCsrform(!csrform);
  
  getAPiPackages()
}
const filterData = (e) => {
setFilter({
  ...filter, [e.target.name] : e.target.value
});
 
}
const lastIndex = currentPage * postPages;
const firstIndex = lastIndex - postPages;
const slicePost = getpackages.slice(firstIndex, lastIndex);


    return (
      <>
      <section className={Style.csrSection}>
      <div className={Style.csrContainer}>
        
          
          {response && 
          
          <div className={disable ? Style.disable : Style.enable}>
            <span className={Style.diableResponse}>
            <h5>{response}</h5>
            <RiCloseFill onClick={() => setDisable(true)}/>
            </span>
          </div>
           }
          <div className={Style.csrFiler}>
          <div className={Style.crsFilterContainer}>
            <input type="date" name="filterdate" id="filterdate" value={filterdate} onChange={(e) => filterData(e)}/>
            <input disabled={filterdate.length > 0 && true} type="number" name="filtertracking" id="filtertracking" placeholder='Filter by tracking' onChange={(e) => filterData(e)} value={filtertracking}/>
            <input disabled={filterdate.length > 0 && true} type="number" name="filterupc" id="filterupc" placeholder='Filter by UPC' onChange={(e) => filterData(e)} value={filterupc}/>
            <select disabled={filterdate.length > 0 && true} name="filtercondition" id="filtercondition" onChange={(e) => filterData(e)} value={filtercondition}>
                        <option value="">All</option>
                        <option value="new">New</option>
                        <option value="openBoxed">Open Boxed</option>
                        <option value="used">Used</option>
                        <option value="problematic">Problematic</option>
                    </select>
                    <button type='button' onClick={clearFilter}>Clear Filter</button>
          </div>
        </div>
          <div className={Style.csrTable}>
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
                    <th>Langth</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Processed ?</th>
                    <th>CSR Note</th>
                  </tr>
                  </thead>
                  <tbody>
                  {slicePost && slicePost.filter((data) => {
                    const dates = new Date(data.createdAt).toLocaleDateString() == new Date(filterdate).toLocaleDateString() ? data : null;
                      
                    return filterdate.length > 0 ? dates : filtertracking.length > 0 ? data.tracking.toLowerCase().includes(filtertracking.toLowerCase()) : filterupc.length > 0 ? data.upc.toLowerCase().includes(filterupc.toLowerCase()) : filtercondition.length > 0 ? data.condition.toLowerCase().includes(filtercondition.toLowerCase()) : clearData
                  }).map((item, index) => {
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
                      <td>{item.processed}{username && <span onClick={() => setprocessform(true)}><FaRegEdit className={Style.edit} onClick={() => editPackages(item._id)}/></span>}</td>
                      <td>{item.csrnote}{username && <span onClick={() => setCsrform(true)}><FaRegEdit className={Style.edit} onClick={() => editPackages(item._id)}/></span>}</td>
                    </tr>
                      )
                    })}
                  </tbody>
                </table>
          </div>
      </div>
  </section>
  <div className={`${Style.processForm} ${
      processform ? `${Style.active}` : `${Style.inactive}`
    }`} >
      
  <div className={Style.processFormContainer} >
  <form onSubmit={processhandleSubmit}>
  <RiCloseCircleFill onClick={() => setprocessform(false)}/>
  <span>
              <label htmlFor="processed">Processed</label>
              <select name="processed" id="processed" onChange={(e) => processhandleChange(e)}>
                <option value="">Select One</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
          </span>
          <button type="submit">{loading ? "Updating..." : "Update"}</button>
  </form>
  </div>
</div>
  <div className={`${Style.csrForm} ${
      csrform ? `${Style.active}` : `${Style.inactive}`
    }`} >
  <div className={Style.csrFormContainer} >
  <form onSubmit={csrhandleSubmit}>
  <RiCloseCircleFill onClick={() => setCsrform(false)}/>
  <span>
              <label htmlFor="processed">CSR Note</label>
              <textarea name="csrnote" id="csrnote" cols="30" rows="10" value={csrnote} onChange={(e) => csrhandleChange(e)} placeholder='Ad your note'></textarea>
          </span>
          <button type="submit">{loading ? "Updating..." : "Update"}</button>
  </form>
  </div>
</div>
<Pagination totalPosts={getpackages} postPerPage={postPages} setCurrentPage={setCurrentPage} currentPage={currentPage} setPostPages={setPostPages}/>
</>
    );
};

export default Csr;