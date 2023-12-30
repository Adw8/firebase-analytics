import { useEffect, useState } from 'react';
import { db } from '../firebase'// Replace with the path to your Firebase config file
import {collection, getDocs, setDoc} from 'firebase/firestore'
import ModalComponent from './Modal';
import Yesterday from './yesterday';

const UserDashboard = () => {
    const [userData, setUserData] = useState([]);
    const [userSessionData, setUserSessionData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isYesterdayModalOpen, setIsYesterdayModalOpen] = useState(false);
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
              userSessionArray.push({
                id: doc.id,
                session_start: session.session_start,
                session_end: session.session_end,
              });
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
      
      // Math.random(),
      // session.session_start,
      // session.session_end,
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
        {/* <button onClick={logModalData}>openYesterdayModal</button> */}
      </div>
      <ModalComponent isOpen={isYesterdayModalOpen} onClose={closeYesterdayModal} headings={modalHeadingsYesterday} tableData={modalTableDataYesterday} />
    </div>


  </div>

    );
  };
  
  export default UserDashboard;
