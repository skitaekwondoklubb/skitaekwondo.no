import React from 'react';
import book1 from './pictures/ttu_bok1.webp'
import book2 from './pictures/ttu_bok2.webp'
import book3 from './pictures/ttu_bok3.webp'

const books = [
    book1,
    book2,
    book3
]

function RandomBooks() {
    return (
        <img src={books[Math.floor(Math.random() * 3)]} alt="Bilde av utstyr" />
    )
}

export default RandomBooks;