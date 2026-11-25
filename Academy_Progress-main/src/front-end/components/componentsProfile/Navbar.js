import { Link } from 'react-router-dom';

function Navbar({ onSignOut }) {
  return (
    <nav>
      <h1>Faculty of Science</h1>
      <div id="navbarLinksContainer">
        <Link id="profileNavBar" to="/profile">
          Profile
        </Link>
        <button className="createAccountNavBar" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
