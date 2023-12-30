// import React from 'react'
// import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import {collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export const incrementLoginCount = async(uid) =>{
    const userDocRef = doc(collection(db, "users"), uid);
    const userDoc = await getDoc(userDocRef);
    const currentLoginCount = userDoc.exists() ? userDoc.data().loginCount || 0: 0
    await updateDoc(userDocRef, {
        loginCount: currentLoginCount + 1,
    });
}

export const storeSessionStart = async (uid) => {
    try {
        const id = Math.floor(Math.random() * Date.now());
        const timestamp = new Date();
        console.log(timestamp);
        const userDocRef = doc(collection(db, "userSessions"), uid)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()){
        const existingSessions = userDoc.data().sessions || [];
        const updatedSessions = [...existingSessions, {
            session_id: id,
            session_start: timestamp,
        } ]

       
          
           await setDoc(userDocRef, {
            sessions: updatedSessions,
        });
    } else{
        await setDoc(userDocRef, {
            sessions: [{
              session_id: id,
              session_start: timestamp,
            }],
          });
        
        
    }
        localStorage.setItem('session_id', id);
        console.log('Session start stored successfully with id ', id);
    } catch (error) {
        console.log('Error storing session start:', error.message);
    }
};