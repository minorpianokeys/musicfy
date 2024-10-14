import { useOutletContext, useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import "../styles/Form.css"

function Login() {
    const navigate = useNavigate();
    const context = useOutletContext();
    const setUser = context[1]

    const formSchema = yup.object().shape({
        email: yup.string().required("Must enter a username"),
        password: yup.string().required("Must enter a password")
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: values => {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(r => {
                if(r.ok) {
                    r.json()
                    .then(user => setUser(user))
                    .then(() => navigate('/'))
                }
            })
            
        }
    })



    return(
        <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <p style={{color:'red'}}>{formik.errors.email}</p>
                    <input 
                      type="text"
                      id="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <p style={{color:'red'}}>{formik.errors.password}</p>
                    <input 
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;