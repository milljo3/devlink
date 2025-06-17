import '../styles/navbar.css';

const Navbar = () => {
    return (
        <>
            {(localStorage.getItem('username') || localStorage.getItem('token')) &&
                <button
                    id="navbar-sign-out"
                    onClick={() => {
                        localStorage.removeItem("username");
                        localStorage.removeItem("token");
                    }}
                >
                    Sign out
                </button>
            }
        </>
    )
};

export default Navbar;