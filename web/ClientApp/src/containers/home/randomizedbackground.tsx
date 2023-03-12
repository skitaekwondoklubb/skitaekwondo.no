import React from 'react';
import Front1 from './pictures/Front1.webp';
import Front2 from './pictures/Front2.webp';
import Front3 from './pictures/Front3.webp';
import Front4 from './pictures/Front4.webp';
import Front5 from './pictures/Front5.webp';
// import Front6 from './pictures/Front6.webp';
import styles from './home.module.css'

const pictures = [
    Front1,
    Front2,
    Front3,
    Front4,
    Front5,
    // Front6
]

function RandomizedBackground() {
    return (
        <img src={pictures[Math.floor(Math.random() * 5)]} className={`${styles.homeBG} fadeInHomeBG`} />
    )
}

export default RandomizedBackground;