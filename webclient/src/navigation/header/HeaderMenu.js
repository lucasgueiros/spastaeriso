import './HeaderMenu.css';
import { Link } from 'react-router-dom';

function HeaderMenu() {
  return (
    <div className="header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/inputs">Insumos</Link></li>
        </ul>
      </nav>
    </div>
  );
}


export default HeaderMenu;
