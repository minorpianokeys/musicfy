import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router";
import Swal from 'sweetalert2'
import Track from "../components/Track";
import "../styles/Profile.css"

function Profile() {
    const [profile, setProfile] = useState([])
    const { username, profile_picture, bio, tracks } = profile;
    const context = useOutletContext();
    const user = context[0];
    const setUser = context[1];
    const params = useParams();
    const profileId = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/users/${profileId}`)
        .then(r=>r.json())
        .then(userData => setProfile(userData))
    }, [])

    function handleDelete() {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch("/logout", {
                    method: "DELETE",
                })
                .then(setUser(null))
        
                fetch(`/users/${profileId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(navigate("/"))  
                Swal.fire({
                    title: "Deleted!",
                    text: "Your profile has been deleted.",
                    icon: "success"
                });
            }
          });

        
    }
 
    return (
        <div className="profile-container">
            <div className="profile-user-info">
                <div className="profile-banner">
                    <h1>{username}</h1>
                    <img src={profile_picture}/>
                </div>
                {user?.id == profileId ? (
                    <div className="edit-delete">
                        <p onClick={() => navigate(`/profile/${profileId}/edit`)} className="edit">Edit Profile</p>
                        <p onClick={handleDelete} className="delete">Delete Profile</p>
                    </div>
                ) : (
                    <div></div>
                )}
                
            </div>
            
            <div className="profile-tracks">
                <div className="tracks-container">
                    <h4>Tracks</h4>
                    {tracks?.map(track => (
                        <Track key={track.id} track={track}/>
                    ))}
                </div>
                <div className="bio">
                    <h4>Bio</h4>
                    <p>{bio}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;