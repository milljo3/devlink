import '../styles/navbar.css';
import {useAuth} from "../context/AuthContext";

const Navbar = () => {
    const {username, logout} = useAuth();

    return (
        <>
            {username &&
                <button
                    id="navbar-sign-out"
                    onClick={() => {
                        logout();
                    }}
                >
                    Sign out
                </button>
            }
        </>
    )
};

export default Navbar;