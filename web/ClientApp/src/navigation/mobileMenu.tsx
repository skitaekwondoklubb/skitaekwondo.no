import { useEffect, useState } from 'react';
import { destinations } from './destinations';
import { Link, NavLink, Router, useHistory } from 'react-router-dom';
import styles from './navigation.module.css';

function MobileMenu() {
    const history = useHistory();

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