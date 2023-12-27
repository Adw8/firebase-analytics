import { useEffect, useState } from 'react';
import { db } from '../firebase'// Replace with the path to your Firebase config file
import {collection, query, where, getDocs} from 'firebase/firestore'


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
  
    return (
        <div>
        <h1 className='text-2xl font-bold mb-4'>User Login Data</h1>
        <div className='text-center mt-8'>
        <button
            onClick={openModal}
            className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
            View Login Info
        </button>

        {isModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-4 rounded-lg w-225'>
              <h2 className='text-lg font-semibold mb-4'>All Users</h2>
              <div className='overflow-x-auto mr-4'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='border px-4 py-2'>User ID</th>
                    <th className='border px-4 py-2 mr-4'>Username</th>
                    <th className='border px-4 py-2 mr-4'>LoginCount</th>

                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td className='border px-4 py-2'>{user.id}</td>
                      <td className='border px-4 py-2 mr-4'>{user.username}</td>
                      <td className='border px-4 py-2 mr-4'>{user.loginCount}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <button
                onClick={closeModal}
                className='mt-4 px-4 py-2 bg-green-600 text-white rounded'
              >
                Close
              </button>
            </div>
          </div>
         
        )}
      </div>
      </div>
    );
  };
  
  export default UserDashboard;