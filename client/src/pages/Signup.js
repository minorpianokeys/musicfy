import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import Axios from "axios";

import "../styles/Form.css"

function Signup() {
    const navigate = useNavigate();
    const context = useOutletContext();
    const setUser = context[1]
    const [imageFile, setImageFile] = useState(null);
    const [newUserData, setNewUserData] = useState({
        email: "",
        password: "",
        username: "",
        profile_picture: "",
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
        console.log(newUserData)
        
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);
        imageFormData.append("upload_preset", "ftb7bwla");
        imageFormData.append("resource_type", "image");

        Axios.post("https://api.cloudinary.com/v1_1/dlmqqypq1/image/upload", imageFormData)
            .then((imageResponse) => {
                const imageUrl = imageResponse.data.url;

                const dataToPost = {
                    ...newUserData,
                    profile_picture: imageUrl,
                }

                fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToPost)
                })
                .then(r => r.json())
                .then(user => setUser(user))
                .then(() => navigate('/'))
            })
    }

    

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={newUserData.email}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={newUserData.password}
                      onChange={handleChange}
                    />
                </div>
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
                    <label htmlFor="profile_picture">Profile Picture</label>
                    <input
                      type="file"
                      name="profile_picture"
                      placeholder="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
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
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Signup;