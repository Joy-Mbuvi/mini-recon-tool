import React , {useState,}from "react"
import axios from 'axios'
import ResultsTable from "./resultstable"
import "./uploadfile.css"


function Upload() {

    const[providerfile,setProviderfile]= useState(null)
    const[internalfile,setInternalfile]= useState(null)
    const[results,setResults]= useState(null)


    async function handleupload() {
      
        const formData= new FormData ()

        formData.append('internal_file', internalfile)
        formData.append('provider_file',providerfile)

        const response= await axios.post(`http://localhost:8000/api/reconcile/`,formData);
         setResults(response.data)

        
    }
 return(
    <div className="button-group">
            

            <input type = 'file' onChange = {(e) => setInternalfile(e.target.files[0]) }/>
            <input type= 'file'  onChange={(e) =>setProviderfile(e.target.files[0])}/>


            <button onClick={handleupload} >Reconcile</button>

           { results && <ResultsTable results= {results} />}



    </div>
 )
}



export default Upload