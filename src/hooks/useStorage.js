import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "../firebase";


const useStorage = (file) => {
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references 
        const storageRef = ref(storage, file.name);
        uploadBytes(storageRef, file);
    }, [file])
    return { url, error }
}

export default useStorage;