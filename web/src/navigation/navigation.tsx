import { useEffect, useState } from 'react';
import { destinations } from './destinations';
import { Link, NavLink, Router, useHistory } from 'react-router-dom';
import styles from './navigation.module.css';

function Navigation() {
    const history = useHistory();
    const [menuEnabled, setMenuEnabled] = useState(false);

    function toggleMenu() {
        if(!history.location.pathname.endsWith("menu")) {
            history.push("/menu");
        }
        else {
            history.goBack();
        }
    }

    return (
        <nav className={styles.navigation}>
            <div className={styles.logoHome}>
                <Link to="/" onClick={() => setMenuEnabled(false)} className={styles.hjemLink}>
                    <img src="/pictures/skitkd_logo.png"/>
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
                        return (
                            <NavLink activeClassName={styles.selectedNav} onClick={() => setMenuEnabled(false)}
                                to={item.link} 
                                className={ item.name === "Hjem" 
                                    ? styles.hjemLink 
                                    : styles.navLink
                                }
                            >{item.name} </NavLink>
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default Navigation;