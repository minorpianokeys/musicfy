import { useFormik } from 'formik';
import { useEffect } from "react";
import { useOutletContext } from "react-router";
import * as yup from 'yup';
import CommentCard from './CommentCard';
import '../styles/TrackInfo.css'

function Comments({ trackId, comments }) {
    const context = useOutletContext();
    const user = context?.[0]

    const formSchema = yup.object().shape({
        body: yup.string().required("Must enter a comment").max(25),
    })

    const formik = useFormik({
        initialValues: {
            body: "",
            track_id: trackId,
            user_id: user?.id,
        },
        validationSchema: formSchema,
        onSubmit: values => {
            fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
        }
    })

    useEffect(() => {
        if (user && user.id) {
            formik.setFieldValue("user_id", user.id);
        }
    }, [user]); // This runs when 'user' changes

    return (
        <div>
            { user ? (
                <form onSubmit={formik.handleSubmit} className='comment-form'>
                    <input 
                        id="body"
                        name="body"
                        placeholder="Add a comment..."
                        value={formik.values.body}
                        onChange={formik.handleChange}
                    />
                    <button type='submit'>Comment</button>
                </form>
            ): (
                <p>Login to leave Comment</p>
            )}
            
            <div>
                {comments?.map(comment => (
                    <CommentCard key={comment.id} comment={comment}/>
                ))}
            </div>
        </div>
    )
}

export default Comments