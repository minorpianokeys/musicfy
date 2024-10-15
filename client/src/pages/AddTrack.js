import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router";
import Axios from "axios";
import Swal from "sweetalert2";
import "../styles/Form.css"

function AddTrack() {
    const context = useOutletContext();
    const user = context?.[0]
    const navigate = useNavigate();
    const [audioFile, setAudioFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [newTrackData, setNewTrackData] = useState({
        title: "",
        file_url: "",
        description: "",
        genre: "",
        track_art: "",
        artist: "",
        user_id: "",
    });
    
    function handleChange(e) {
        const { name, value } = e.target
        setNewTrackData({
            ...newTrackData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const imageFormData = new FormData();
            imageFormData.append("file", imageFile);
            imageFormData.append("upload_preset", "ftb7bwla");
            imageFormData.append("resource_type", "image");
    
            const imageResponse = await Axios.post("https://api.cloudinary.com/v1_1/dlmqqypq1/image/upload", imageFormData);
            const imageUrl = imageResponse.data.url;
    
            const audioFormData = new FormData();
            audioFormData.append("file", audioFile);
            audioFormData.append("upload_preset", "ftb7bwla");
            audioFormData.append("resource_type", "video");
    
            const audioResponse = await Axios.post("https://api.cloudinary.com/v1_1/dlmqqypq1/video/upload", audioFormData);
            const audioUrl = audioResponse.data.url;
    
            const dataToPost = {
                ...newTrackData,
                track_art: imageUrl,
                file_url: audioUrl,
            };
    
            await fetch("/tracks", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToPost),
            });
    
            navigate(`/profile/${user.id}`);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please include audio and track art files",
              });
            console.error('Error uploading files:', error);
        }
    }

    useEffect(() => {
        if (user && user.id) {
            setNewTrackData({
                ...newTrackData,
                user_id: user.id,
                artist: user.username
            });
        }
    }, [user]);


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={newTrackData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="file_url">Audio Track</label>
                    <input
                        type="file"
                        id="file_url"
                        name="file_url"
                        onChange={(e) => setAudioFile(e.target.files[0])}
                    />
                </div>
                <div>
                    <input
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={newTrackData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        id="genre"
                        name="genre"
                        placeholder="Genre"
                        value={newTrackData.genre}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="track_art">Track Art</label>
                    <input
                        type="file"
                        id="track_art"
                        name="track_art"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>
                <button type="submit">Add Track</button>
            </form>
        </div>
    )
}

export default AddTrack;