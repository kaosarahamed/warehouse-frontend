import { useRef, useState } from 'react';
import Style from '../styles/UploadProducts.module.css';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;
const UploadProducts = () => {
    const [csvfile, setFile] = useState(null);
    const [fileError, setfileError] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();
    const [uploaded, setUploaded] = useState(null);
  
  
  const handleSubmit= async (e)=>{
    setLoading(true);
    const formData = new FormData();
    formData.append("file", csvfile)
    e.preventDefault();
    if(csvfile.type !== "text/csv"){
      setfileError("please select csv file");
      setLoading(false)
    }else{
      await axios.post(`${API_URL}products`, formData, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100));
        },
      },{
        headers : {
          "Content-Type" : 'multipart/form-data'
        }
      }).then((res) =>{
      setResponse(res.data.message);
      setLoading(false);
      setfileError(null)
    }).catch((err) => {
      setResponse(err.response.data.message);
      setLoading(false)
    });
  }
  fileRef.current.value = ""

  
    
  }
    return (
        <div className={Style.upProducts}>
            <div className={Style.upContainer}>
              {response && <h4>{response}</h4>}
                <h2>Upload CSV File</h2>
                <form onSubmit={handleSubmit}>
                        <label htmlFor="upproduct" className={Style.dropContainer}>
                        <FaUpload />
                        <p>Browse File</p>
                        <input ref={fileRef} onChange={(e) => setFile(e.target.files[0])} type="file" name="upproduct" id="upproduct" required/>
                        </label>
                       {uploaded && 
                        <div className={Style.progressbar}>
                        <div style={{
                          height: "100%",
                          width: `${uploaded}%`,
                          backgroundColor: "#FF4719",
                          transition:"width 0.5s",
                          borderRadius: "50px"
                        }}></div>
                        <span className={Style.progressPercent}>{uploaded && `${uploaded}%`}</span>
                      </div>}
                        {fileError && <h3>{fileError}</h3>}
                    <button type="submit">{loading ? "Uploading..." : "Upload"}</button>

                </form>
            </div>
        </div>
    );
};

export default UploadProducts;