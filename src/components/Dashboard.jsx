import { useEffect, useState } from 'react';
import { db } from '../firebase'// Replace with the path to your Firebase config file
import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore'
import { UserAuth } from '../context/AuthContext';
import ModalComponent from './Modal';

const UserDashboard = () => {
  const {user} = UserAuth();
    const [userData, setUserData] = useState([]);
    const [currSessionData, setCurrSessionData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isYesterdayModalOpen, setIsYesterdayModalOpen] = useState(false);
    const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

    const [docID, setDocID] = useState([])
  
    const openModal = () => {
      setIsModalOpen(true);
      getData();
    };
    const openYesterdayModal = () => {
      setIsYesterdayModalOpen(true);
      getYesterday();
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const closeYesterdayModal = () => {
      setIsYesterdayModalOpen(false)
    } 
    
    const openSessionModal = () =>{
      setIsSessionModalOpen(true);
      getSessions();
    }
    const closeSessionModal = () =>{
      setIsSessionModalOpen(false);

    }
    

    const getData = async () => {
      const userDataArray = [];
  
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
          userDataArray.push({
            id: doc.id,
            username: doc.data().username,
            loginCount: doc.data().loginCount || 0
          });
        });
  
        setUserData(userDataArray);
        // console.log(userData)
      } catch (error) {
        alert(error.message);
      }
    };
    const modalHeadings = ['Username', 'LoginCount'];
    const modalTableData = userData.map((user) => [user.username, user.loginCount]);  
    
    const getYesterday = async () => {
      const userSessionArray = [];
      const docs = []
      try {
        const querySnapshot = await getDocs(collection(db, 'userSessions'));
    
        querySnapshot.forEach((doc) => {
          // doc.data().sessions.forEach((session) => {
            const sessions = doc.data().sessions;
            for (const session of sessions){
            const timestamp = session.session_start;
    
            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
            const formattedDate = date.toString().slice(8, 11); // Use ISO format for comparison
    
            let today = new Date();
            let yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
    
    
            if (formattedDate === yesterday.toString().slice(8, 11)) {
            
             
              docs.push(doc.id);
              break;
            }}

          });
          setDocID(docs)
        // });
    
        setUserSessionData(userSessionArray);
        // console.log(userSessionArray)
        // return userSessionArray
      } catch (error) {
        alert(error.message);
      }
    };

    


    const modalHeadingsYesterday = ['User ID'];
   
    const modalTableDataYesterday = docID.map((id) => [
      id
    ]);

    const getSessions = async () => {
      const userSessions = []
      try {
        const docRef = doc(collection(db, "userSessions"), user.uid);
        const docSnapshot = await getDoc(docRef);
    
        if (docSnapshot.exists()) {
          // console.log(docSnapshot.data().sessions);
          docSnapshot.data().sessions.map((session)=>{
            userSessions.push({
              session_start: session.session_start,
              session_end: session.session_end
            })
          })
          // Additional processing of docSnapshot.data() if needed
          setCurrSessionData(userSessions)
          console.log("Curr ", currSessionData)
        } else {
          console.log("Document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
        // Handle the error appropriately
      }
    };
    
    const modalHeadingsSessions = ['Session Start', 'Session End'];
    // const modalTableData = userData.map((user) => [user.username, user.loginCount]);  
    // const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
   
    const modalTableDataSessions = currSessionData.map((user) => [
      user.session_start && new Date(user.session_start.seconds * 1000 + user.session_start.nanoseconds / 1e6).toLocaleString() || "",
  user.session_end && new Date(user.session_end.seconds * 1000 + user.session_end.nanoseconds / 1e6).toLocaleString() || ""
    ]);
    
  
    return (
    <div>
    <h1 className='text-center text-3xl my-4 font-bold'>Reports</h1>
    <div className='max-w-4xl mx-auto my-16 p-4 bg-white shadow-md rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl mb-4'>Total Login Count of users</h1>
        <button
          onClick={openModal}
          className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          View Login Info
        </button>
      </div>

      <ModalComponent isOpen={isModalOpen} onClose={closeModal} headings={modalHeadings} tableData={modalTableData} />
    </div>


    <div className='max-w-4xl mx-auto my-16 p-4 bg-white shadow-md rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl mb-4'>List of users that logged in yesterday</h1>
        <button
          onClick={openYesterdayModal}
          className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          View User Info
        </button>
      </div>
      <ModalComponent isOpen={isYesterdayModalOpen} onClose={closeYesterdayModal} headings={modalHeadingsYesterday} tableData={modalTableDataYesterday} />
    </div>

    <div className='max-w-4xl mx-auto my-16 p-4 bg-white shadow-md rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl mb-4'>View my sessions</h1>
        <button
          onClick={openSessionModal}
          className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          View Info
        </button>
      </div>
      <ModalComponent isOpen={isSessionModalOpen} onClose={closeSessionModal} headings={modalHeadingsSessions} tableData={modalTableDataSessions} />
    </div>
    


  </div>

    );
  };
  
  export default UserDashboard;
