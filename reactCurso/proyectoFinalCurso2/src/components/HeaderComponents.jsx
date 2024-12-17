import { Link } from "react-router-dom"
import "./HeaderComponents.css";

function HeaderComponents() {
  return (
    <header className="header">
        <nav>
            <ul className="nav-list">
                <li>
                    <Link to="/" className="link">Home</Link>
                </li>
                <li>
                    <Link to="/tasks" className="link">Tasks</Link>
                </li>
             
            </ul>
        </nav>
    </header>
)
}

export default HeaderComponents