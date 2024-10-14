import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Track from "../components/Track";
import "../styles/Home.css"

function Home() {
    const [tracks, setTracks] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()
    const homeBannerImage = "https://img.freepik.com/premium-photo/blue-pink-wave-background-with-blue-pink-wave-words-music-it_605423-3231.jpg"

    useEffect(() => {
        fetch('/tracks')
        .then(r => r.json())
        .then(trackData => setTracks(trackData))

        fetch('/users')
        .then(r => r.json())
        .then(userData => setUsers(userData))
    }, [])

    function handleProfileClick(id) {
        navigate(`/profile/${id}`)
    }


    return(
        <div className="home-container">
            <div className="home-banner">
                <img src={homeBannerImage}/>
            </div>
            
            <div className="home-lower">
                <div className="home-tracks">
                    <h2>All Tracks</h2> 
                    {tracks?.map(track => (
                        <Track key={track.id} track={track}/>
                    ))}
                </div>
                <div className="home-users">
                    <h2>All Users</h2>
                    {users?.map(user => (
                        <div key={user.id} className="home-users-name">
                            <img src={user.profile_picture}/>
                            <h4 onClick={() => handleProfileClick(user.id)}>{user.username}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;