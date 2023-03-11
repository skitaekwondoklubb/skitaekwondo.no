import { destinations } from './destinations';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

function MobileMenu() {

    return (
        <div className={styles.mobileMenu}>
            {
                destinations && destinations.map((item) => {
                    return (
                        <NavLink to={item.link} className={ `${styles.navLink}`}>{item.name}</NavLink>
                    )
                })
            }
        </div>
    )
}

export default MobileMenu;