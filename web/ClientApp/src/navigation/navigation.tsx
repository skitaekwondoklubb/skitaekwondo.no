import { useState } from 'react';
import { destinations } from './destinations';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './navigation.module.css';
import logo from '../containers/skitkd_logo.webp';
import { useMatch } from 'react-router';

function Navigation() {
    const navigate = useNavigate();
    const match = useMatch("*/menu");
    const [menuEnabled, setMenuEnabled] = useState(false);

    function toggleMenu() {
        if(!match) {
            navigate("/menu");
        }
        else {
            navigate("..");
        }
    }

    return (
        <nav className={styles.navigation}>
            <div className={styles.logoHome}>
                <Link to="/" onClick={() => setMenuEnabled(false)} className={styles.hjemLink}>
                    <img src={logo} alt="Home"/>
                    <span>Ski Taekwondo Klubb</span>
                </Link>
            </div>
            <div className={styles.mobileButton}>
                <button onClick={toggleMenu} className={styles.hamburgerMenu}>
                    <svg viewBox="0 0 100 80" width="40" height="40">
                        <rect width="100" height="20"></rect>
                        <rect y="30" width="100" height="20"></rect>
                        <rect y="60" width="100" height="20"></rect>
                    </svg>
                </button>
            </div>
            <div className={styles.rightSideNav}>
                {
                    destinations && destinations.map((item) => {
                        const linkStyle = item.name === "Hjem" ? styles.hjemLink : styles.navLink
                        return (
                            <NavLink 
                                className={({ isActive }) => `${linkStyle} ${isActive ? styles.selectedNav : ""}`} 
                                onClick={() => setMenuEnabled(false)}
                                to={item.link} 
                                key={`${item.name}_nav`}
                            >{item.name} </NavLink>
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default Navigation;