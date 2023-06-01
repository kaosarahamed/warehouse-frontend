import { useRef, useState } from 'react';
import Style from '../styles/UploadProducts.module.css';
import axios from 'axios';


const UploadProducts = () => {
    const [csvfile, setFile] = useState(null);
    const [fileError, setfileError] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();

  
  
  const handleSubmit= async (e)=>{
    setLoading(true);
    const formData = new FormData();
    formData.append("file", csvfile)
    e.preventDefault();
    if(csvfile.type !== "text/csv"){
      setfileError("please select csv file");
      setLoading(false)
    }else{
      await axios.post("http://localhost:4000/products", formData, {
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
                    <span>
                        <label htmlFor="upproduct">Select Your File</label>
                        <input ref={fileRef} onChange={(e) => setFile(e.target.files[0])} type="file" name="upproduct" id="upproduct" />
                        {fileError && <h3>{fileError}</h3>}
                    </span>
                    <button type="submit">{loading ? "Uploading..." : "Upload"}</button>
                </form>
            </div>
        </div>
    );
};

export default UploadProducts;