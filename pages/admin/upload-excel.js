import React, { useState } from "react";
import * as XLSX from "xlsx";
import { db } from "../../firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore"; // Import setDoc and doc
import Header from "../../component/Header";
import Navbar from "../../component/Navbar";


const UploadExcel = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData); // Set parsed Excel data
      console.log(jsonData); // Log the parsed data for debugging
    };

    reader.readAsArrayBuffer(file);
  };

  const uploadDataToFirestore = async () => {
    if (excelData) {
      try {
        const collectionRef = collection(db, "userdetails"); // Replace with your Firestore collection name
        for (let row of excelData) {
          const mobileNumber = String(row["Mobile no"]); // Convert 'Mobile no' column value to string
          if (mobileNumber) {
            // Use the mobile number as the document ID, ensuring it's a string
            await setDoc(doc(collectionRef, mobileNumber), row);
          } else {
            console.error("Mobile number missing in row:", row);
          }
        }
        alert("Data uploaded successfully to Firestore using mobile numbers!");
      } catch (error) {
        console.error("Error uploading data:", error);
      }
    } else {
      alert("Please upload a file first.");
    }
  };

  return (
    <>
    <Header/>
   
     <div className='logoContainer'>
      <img  src="/ujustlogo.png"  alt="Logo" className="logos" />
    </div> 
     <Navbar/>
     <main className='maincontainer'>
    <div className="leave-requests-container">
    <div className="leave-container">
    <h2>Upload Excel</h2>
    <button className="m-button-5" onClick={() => window.history.back()}>
    Back
  </button>
    <div className="form-group">
      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
      </div>
      <button className="m-button" onClick={uploadDataToFirestore}>Upload</button>
 
    </div>
    </div>
    </main>
    </>
  );
};

export default UploadExcel;
