import { useEffect, useState } from 'react';
import { db } from '../firebase'// Replace with the path to your Firebase config file
import {collection, query, where, getDocs} from 'firebase/firestore'
import ModalComponent from './Modal';

const UserDashboard = () => {
    const [userData, setUserData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
      getData();
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
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
      } catch (error) {
        alert(error.message);
      }
    };
    const modalHeadings = ['User ID', 'Username', 'LoginCount'];

    const modalTableData = userData.map((user) => [user.id, user.username, user.loginCount]);

  
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
  </div>

    );
  };
  
  export default UserDashboard;