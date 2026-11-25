import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h1> Faculty of Science</h1>
      <div id="navbarLinksContainer">
        <Link id="signInNavBar" to="/login">
          Sign in
        </Link>
        <Link id="craeteAccountNavBar" to="/register">
          {' '}
          Create Account
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
