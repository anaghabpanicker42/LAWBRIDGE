import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ChangePassword = () => {
    
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confPwd, setConfPwd] = useState('');
    const [lawyer, setLawyer] = useState(null);
    
  const LAWYER_ID = sessionStorage.getItem("lawyer_id");

  useEffect(() => {
    fetchLawyer ();
  }, []);

  const fetchLawyer = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/LawyerGetById/${LAWYER_ID}`);
      const lawyers = res.data.lawyer ;

     

      setLawyer(lawyers);
    } catch (err) {
      console.error("Profile fetch error", err);
    } finally {
    }
  };
  

    const handleChange = () => {
      console.log(lawyer); 
      
        if (newPwd !== confPwd)
            return alert('New passwords do not match');
        if (oldPwd !== lawyer.lawyer_password)
            return alert('Wrong password');

        axios.put(`http://127.0.0.1:8000/Lawyerpassword/${LAWYER_ID}/`,
            { new_password: newPwd })
            .then(res => {
                alert(res.data.message)
                setOldPwd('');
                setNewPwd('');
                setConfPwd('');
            })
            .catch(() => alert('Update failed'));
    };

    return (
        <div>
            <h3>Change Password</h3>
            <table >
                <tbody>
                    <tr>
                        <td>Old Password</td>
                        <td><input type="password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>New Password</td>
                        <td><input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Confirm Password</td>
                        <td><input type="password" value={confPwd} onChange={e => setConfPwd(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center">
                            <button onClick={handleChange}>Change</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ChangePassword;