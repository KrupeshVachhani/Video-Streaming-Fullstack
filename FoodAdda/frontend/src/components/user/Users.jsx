// import React, { useState, useEffect } from "react";
// import me from "../../assets/DefaulImge.png";
// const Users = () => {
//   const [userData, setUserData] = useState(null);
//   const [userName, setUserName] = useState("");

//   const fetchAdminData = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/users/admin/${userName}`
//       );
//       const data = await response.json();
//       setUserData(data);
//     } catch (error) {
//       console.error("Error fetching admin data:", error);
//     }
//   };

//   useEffect(() => {
//     if (userName) {
//       fetchAdminData();
//     }
//   }, [userName]);

//   return (
//     <section className="tableClass">
//       <main>
//         <label htmlFor="username">Enter Admin Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />

//         {userData && (
//           <table>
//             <thead>
//               <tr>
//                 <th>User Id</th>
//                 <th>Name</th>
//                 <th>Photo</th>
//                 <th>Role</th>
//                 <th>Since</th>
//               </tr>
//             </thead>

//             <tbody>
//               <tr>
//                 <td>{userData._id}</td>
//                 <td>{userData.name}</td>
//                 <td>
//                   <img src={me} alt="User" />
//                 </td>
//                 <td>{userData.role}</td>
//                 <td>{userData.createdAt}</td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </main>
//     </section>
//   );
// };

// export default Users;


// import React, { useState } from "react";
// import defaultImage from "../../assets/DefaulImge.png";

// const Users = () => {
//   const [userData, setUserData] = useState(null);
//   const [userName, setUserName] = useState("");
//   const [error, setError] = useState("");

//   const fetchAdminData = async () => {
//     try {
//       const formattedName = userName.trim();
//       const response = await fetch(
//         `http://localhost:3000/api/users/admin/${formattedName}`
//       );

//       if (response.ok) {
//         const data = await response.json();
//         if (data && data.length > 0) {
//           // Assuming the first entry in the response array is the desired admin user
//           const adminData = data[0];
//           setUserData(adminData);
//           setError("");
//         } else {
//           setError("Admin not found. Please check the username.");
//         }
//       } else {
//         setError("Error fetching admin data. Please try again later.");
//       }
//     } catch (error) {
//       setError("Error fetching admin data. Please try again later.");
//     }
//   };

//   return (
//     <section className="tableClass">
//       <main>
//         <label htmlFor="username">Enter Admin Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <button onClick={fetchAdminData}>Find Admin</button>

//         {error && <p className="error">{error}</p>}

//         {userData && (
//           <table>
//             <thead>
//               <tr>
//                 <th>User Id</th>
//                 <th>Name</th>
//                 <th>Role</th>
//                 <th>Since</th>
//                 <th>Photo</th>
//               </tr>
//             </thead>

//             <tbody>
//               <tr>
//                 <td>{userData._id}</td>
//                 <td>{userData.name}</td>
//                 <td>{userData.role}</td>
//                 <td>{new Date(userData.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <img src={defaultImage} alt="User" />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </main>
//     </section>
//   );
// };

// export default Users;


import React, { useState } from "react";
import defaultImage from "../../assets/DefaulImge.png";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    try {
      const formattedName = userName.trim();
      const response = await fetch(
        `http://localhost:3000/api/users/admin/${formattedName}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setUserData(data);
          setError("");
        } else {
          setError("No admin users found for the given username.");
          setUserData([]);
        }
      } else {
        setError("No admin users found for the given username.");
        // setError("Error fetching admin data. Please try again later.");
        setUserData([]);
      }
    } catch (error) {
      setError("Error fetching admin data. Please try again later.");
      setUserData([]);
    }
  };

  return (
    <section className="tableClass">
      <main>
        <label htmlFor="username">Enter Admin Username:</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={fetchAdminData}>Find Admin</button>

        {error && <p className="error">{error}</p>}

        {userData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Role</th>
                <th>Since</th>
                <th>Photo</th>
              </tr>
            </thead>

            <tbody>
              {userData.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <img src={defaultImage} alt="User" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </section>
  );
};

export default Users;
