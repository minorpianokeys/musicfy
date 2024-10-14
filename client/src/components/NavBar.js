import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css"

function NavBar({ onLogout, user }) {
    const navigate = useNavigate();
    
    function handleProfileClick() {
        navigate(`/profile/${user.id}`)
    }

    return (
        <nav className="navbar">
            <div>
                <NavLink to="/">MUSICFY</NavLink>
            </div>
            <div>
                {user ? (
                    <div>
                        <NavLink to="/upload">UPLOAD</NavLink>
                        <img src={user.profile_picture} onClick={handleProfileClick}/>
                        <NavLink onClick={onLogout} className="logout-btn">LOGOUT</NavLink>
                    </div>
                ) : (
                    <div>
                        <NavLink to="/signup">SIGN UP</NavLink>
                        <NavLink to="/login">LOGIN</NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar;