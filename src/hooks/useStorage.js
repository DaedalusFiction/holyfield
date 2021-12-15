import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "../firebase";


const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references 
        const storageRef = ref(storage, file.name);
        uploadBytes(storageRef).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes * 100);
            setProgress(percentage);

        }, (err) => {
            setError(err);
        }, async () => {
            const url = await getDownloadURL(storageRef);
            setUrl(url);
        })
    }, [file]);

    return { progress, url, error }
}

export default useStorage;