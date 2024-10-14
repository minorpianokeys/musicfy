import { useNavigate } from 'react-router';
import Like from './Like';
import '../styles/Track.css'

function Track({ track }) {
    const { id, title, genre, track_art, artist, user_id } = track;
    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/tracks/${id}`)
    }

    function handleProfileClick(user_id) {
        navigate(`/profile/${user_id}`)
    }

    return (
        <div className="track-card" >
            <div className='track-card-img'>
                <img src={track_art} onClick={() => handleClick(id)}/> 
            </div>
            <div className='track-card-info'>
                <div className='track-card-name'>
                    <h3>{title}</h3>
                    <p onClick={() => handleProfileClick(user_id)}>{artist}</p>
                </div>
                <Like track_id={id}/>
            </div>
            
        </div>
    )
}

export default Track;