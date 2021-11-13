import { useState, useEffect } from "react";

import {db, app, fileStorage} from '../firebase.js'
import { ref, uploadBytes } from 'firebase/storage'


const useStorage = (file) => {
    const storageRef = ref(fileStorage, "test");
    
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('successfully uploaded')
    })

}

export {useStorage}