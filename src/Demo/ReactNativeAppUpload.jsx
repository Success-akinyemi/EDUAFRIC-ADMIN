import React, { useState } from "react";
import { View, Button, Text, Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        setFile(result);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream",
    });

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post("http://localhost:5000/api/appUpload/appUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("Upload Successful!");
      console.log("Server Response:", response.data);
    } catch (error) {
      setUploadStatus("Upload Failed!");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick a File" onPress={handleFilePicker} />
      {file && <Text>Selected File: {file.name}</Text>}
      <Button title="Upload File" onPress={handleUpload} />
      <Text>{uploadStatus}</Text>
    </View>
  );
};

export default FileUpload;
