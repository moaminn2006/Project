import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h1>Faculty of Science</h1>
      <div id="navbarLinksContainer">
        <Link id="signInNavBar" to="/register">
          Register
        </Link>
        <Link id="createAccountNavBar" to="/login">
          Sign in
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
