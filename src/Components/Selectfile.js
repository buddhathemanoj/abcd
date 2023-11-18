import React, { useState, useRef } from 'react';
import '../styles/Upload.css'
import { FaEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
const FileUploadComponent = (props) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      console.log("Selected file data:", selectedFile);
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);
  
      // Call the onFileUpload callback with the selected file data
      if (props.onFileUpload) {
        props.onFileUpload(selectedFile);
      }
    }
  };
  

  const handleFilePreview = () => {
    if (filePreview) {
      window.open(filePreview, '_blank');
    }
  };

  const handleFileDelete = () => {
    setFile(null);
    setFilePreview(null);
    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const renderSelectedFile = () => {
    if (!file) {
      return null;
    }

    return (
      <div className="selected-file">
     
        <span>{file.name}</span>
        <div>
             <button  onClick={handleFilePreview} className="preview-button cstmbtn">
        <FaEye />
        </button>
        <button  onClick={handleFileDelete} className="delete-button cstmbtn">
        <MdOutlineDeleteOutline  />
        </button>
        </div>
       
      </div>
    );
  };

  return (
    <div className="file-upload-container">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Custom styled button to trigger file input */}
      <button onClick={openFileInput} className="custom-file-btn">
      <IoCloudUploadOutline /> {props.label}
      </button>

      {renderSelectedFile()}
    </div>
  );
};

export default FileUploadComponent;
