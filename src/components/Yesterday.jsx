import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Replace with the path to your Firebase config file
import { collection, getDocs } from 'firebase/firestore';
import ModalComponent from './Modal';

const Yesterday = () => {
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    getData();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const parseTimestamp = (timestamp) => new Date(timestamp.toDate());
  const isYesterday = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const getFilteredSessions = (sessions) => {
    return sessions.filter((session) => {
      const startDate = parseTimestamp(session.session_start);
      return isYesterday(startDate);
    });
  };
  const getData = async () => {
    const userDataArray = [];
  
    try {
      const querySnapshot = await getDocs(collection(db, 'userSessions'));
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
  
      querySnapshot.forEach((doc) => {
        const sessions = doc.data().sessions || [];
        const matchingSessions = sessions.filter((session) => {
          const startDate = parseTimestamp(session.session_start);
          return startDate.toDateString() === yesterday.toDateString();
        });
  
        if (matchingSessions.length > 0) {
          userDataArray.push({
            id: doc.id,
            username: doc.data().username,
            loginCount: doc.data().loginCount || 0,
            matchingSessions: matchingSessions,
          });
        }
      });
  
      setUserData(userDataArray);
      console.log(userData);
    } catch (error) {
      alert(error.message);
    }
  };

  const modalHeadings = ['Username', 'LoginCount', 'Session Start', 'Session End'];

  const modalTableData = userData.map((user) => {
    const filteredSessions = getFilteredSessions(user.sessions);
    const latestSession = filteredSessions.length > 0 ? filteredSessions[0] : null;

    return [
      user.username,
      user.loginCount,
      latestSession ? parseTimestamp(latestSession.session_start).toLocaleString() : 'N/A',
      latestSession ? parseTimestamp(latestSession.session_end).toLocaleString() : 'N/A',
    ];
  });

  return (
      <div className='max-w-4xl mx-auto my-16 p-4 bg-white shadow-md rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl mb-4'>List of users that logged in yesterday</h1>
        <button
          onClick={()=>{console.log()}}
          className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          View user Info
        </button>
      </div>

      {/* <ModalComponent isOpen={isModalOpen} onClose={closeModal} headings={modalHeadings} tableData={modalTableData} /> */}
    </div>
      
  );
};

export default Yesterday;