import { useState, useEffect } from "react";
import { useParams } from "react-router"
import AudioPlayer from 'react-h5-audio-player';
import Comments from "../components/Comments";
import Like from "../components/Like";
import 'react-h5-audio-player/lib/styles.css';

function TrackInfo() {
    const [track, setTrack] = useState([])
    const { id, title, file_url, description, genre, track_art, comments } = track;
    const params = useParams()

    console.log(track)

    useEffect(() => {
        fetch(`/tracks/${params.id}`)
        .then(r => r.json())
        .then (trackData => setTrack(trackData))
    }, [])

    return (
        <div className="container">
            <div className="track-banner">
                <h3>{title}</h3>
                <div className="track-banner-2">
                    <AudioPlayer 
                      src={file_url}
                    />
                    <img src={track_art}/>
                </div>
            </div>
            <div className="comments-info-container">
                <div className="comment-container">
                    <Comments trackId={params.id} comments={comments} />
                </div>
                <div className="track-info">
                    <Like track_id={id}/>
                    <p>Description: {description}</p>
                    <p>Genre: {genre}</p>
                </div>
            </div>
            
        </div>
    )
}

export default TrackInfo;