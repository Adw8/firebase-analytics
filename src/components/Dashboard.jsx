import { useEffect, useState } from 'react';
import { db } from '../firebase'// Replace with the path to your Firebase config file
import {collection, query, where, getDocs} from 'firebase/firestore'


// const UserDashboard = () => {
//     const [userData, setUserData] = useState([]);

//     const getData = async () =>{
//         const userData = [];
        
//         try {
//             const querySnapshot = await getDocs(collection(db, "users"));
//             querySnapshot.forEach((doc)=>{
//                 // userData.push({
//                 //     id: doc.id,
//                 //     data: doc.data(),
//                 // });
//                 userData.push({
//                     id: doc.id,
//                     username: doc.data().username
//                 })

//             });
//             setUserData(userData);
//             console.log(userData);
            
//         } catch (error) {
//             alert(error.message)
            
//         }
        
//     }
//     useEffect(()=>{
//         getData();
//     }, []);
 
//     return (
//       <div>
//         <h1 className='text-2xl font-bold py-2'>User Login Data</h1>
//        <button onClick={getData} className='border px-5 py-2 my-1 bg-green-600 text-white'>Get Data</button>
//        <ul>
//         {userData.map((user)=>{
//             return(
//             <li key={user.id}>
//                 <strong>UserID:</strong> {user.id} <br/>
//                 <strong>Username:</strong> {user.username} <br/>
                
//             </li>
//             )
//         })}
//        </ul>
//       </div>
//     );
//   };
  
//   export default UserDashboard;


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
          });
        });
  
        setUserData(userDataArray);
      } catch (error) {
        alert(error.message);
      }
    };
  
    return (
        <div>
        <h1 className='text-2xl font-bold py-2'>User Login Data</h1>
        <button
          onClick={openModal}
          className='border px-5 py-2 my-1 bg-green-600 text-white rounded'
        >
          Open Modal
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
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td className='border px-4 py-2'>{user.id}</td>
                      <td className='border px-4 py-2 mr-4'>{user.username}</td>
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
    );
  };
  
  export default UserDashboard;