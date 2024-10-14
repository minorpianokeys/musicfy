import { useState } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router";

import "../styles/Form.css"

function EditProfile() {
    const navigate = useNavigate();
    const context = useOutletContext();
    const setUser = context[1]
    const params = useParams();
    const userId = params.id;
    const [newUserData, setNewUserData] = useState({
        username: "",
        bio: "",
    });

    function handleChange(e) {
        const { name, value } = e.target
        setNewUserData({
            ...newUserData,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        fetch(`/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserData)
        })
        .then(r => r.json())
        .then(user => setUser(user))
        .then(() => navigate(`/profile/${userId}`))
    }

    

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={newUserData.username}
                      onChange={handleChange}
                    />
                </div>
                <div>
                    <textarea 
                      placeholder="Bio..."
                      name="bio"
                      value={newUserData.bio}
                      onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditProfile;