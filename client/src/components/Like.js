import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import Heart from "react-heart"

function Like({ track_id }){
    const context = useOutletContext();
    const user = context?.[0]
    const [active, setActive] = useState(false);
    const [likes, setLikes] = useState([]);
    const [numLikes, setNumLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false);


    useEffect(() => {
        fetch(`/tracks/${track_id}/like`)
        .then(r => r.json())
        .then(likeData => {
            setLikes(likeData);
            setNumLikes(likeData.length)
        })
    }, [track_id])

    useEffect(() => {
        if (user, likes){
            for (let like of likes) {
                if (like.user_id == user?.id) {
                    setIsLiked(true);
                    setActive(true)
                }
            }      
        }
    }, [user, likes])
 

    function handleLike() {
        fetch(`/tracks/${track_id}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                track_id: track_id
            })
        })
        .then(() => {
            setIsLiked(true)
            setActive(active)
            setNumLikes(numLikes + 1)
        })
    }

    function handleUnlike() {
        fetch(`/tracks/${track_id}/unlike`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            setIsLiked(false)
            setActive(!active)
            setNumLikes(numLikes - 1)
        })
    }

    return(
        <div className='like-container'>
            {user ? (
                <div className="heart">
                <Heart isActive={isLiked} onClick={isLiked ? handleUnlike : handleLike}/>
                </div>
            ): (
                <p></p>
            )}
            {numLikes == 1 ? (<p>{numLikes} Like</p>) : (<p>{numLikes} Likes</p>)}
            
        </div>
    )
}

export default Like;