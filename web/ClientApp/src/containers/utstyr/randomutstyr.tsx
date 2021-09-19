import React from 'react';
import overtrekk1 from './pictures/overtrekk1.webp'
import overtrekk2 from './pictures/overtrekk2.webp'
import overtrekk3 from './pictures/overtrekk3.webp'
import overtrekk4 from './pictures/overtrekk4.webp'

const utstyr = [
    overtrekk1,
    overtrekk2,
    overtrekk3,
    overtrekk4
]

function RandomUtstyr() {
    return (
        <img src={utstyr[Math.floor(Math.random() * 4)]} alt="Bilde av utstyr" />
    )
}

export default RandomUtstyr;