import React, { useEffect, useState } from 'react';
import { getVinterleirUsers, VinterleirUser } from '../../services/vinterleirService';
import styles from './vinterleirpublic.module.css';


function VinterleirPublic() {
    const [users, setUsers] = useState<VinterleirUser[]>([]);
    const [showUsers, setShowUsers] = useState<VinterleirUser[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchClub, setSearchClub] = useState("");

    useEffect(() => {
        getVinterleirUsers().then(x => {
            setUsers(x);
        });
    }, []);

    useEffect(() => {
        setFilter(search, searchClub);
    }, [users, search, searchClub])


    function setFilter(search: string, club: string) {
        if(search === "" && club === "") {
            setShowUsers(users);
            return;
        }

        const filteredUsers = users.filter(x => 
            (
                x.club.toLowerCase().includes(club.toLowerCase()) && x.name.toLowerCase().includes(search.toLowerCase()))
            );
        if(filteredUsers != null) {
            setShowUsers(filteredUsers);
        }
        else {
            setShowUsers([]);
        }
    }


    return (
        <div className={`${styles.vinterleirPublicGrid} slideLeft`}>
            <div>
            <h1>Deltagere på vinterleir</h1>

            </div>
            <p>Her kan du se registrerte deltakere på vinterleieren.</p>
            <p className={styles.lessMarginTop}>Man vises kun her dersom man har gitt samtykke til å vises offentlig.</p>
            <p className={styles.lessMarginTop}>Hvis du valgte feil undre registrering, ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a> for å endre valget.</p>

            <div className={styles.searchHeader}>
                <div>
                    <h2>Navn:</h2>
                    <input onChange={x => setSearch(x.currentTarget.value)} value={search}/>
                </div>
                <div>
                    <h2>Klubb:</h2>
                    <input onChange={x => setSearchClub(x.currentTarget.value)} value={searchClub}/>
                </div>


            </div>
            <div className={styles.usersGrid}>
                <div className={styles.gridHeader}>
                    <span><b>Navn:</b></span>
                    <span><b>Klubb:</b></span>
                </div>
                {
                    users.length === 0 
                    ? <h2>Laster...</h2>
                    : ""
                }
                {
                    showUsers.length === 0 && users.length > 0
                    ? <h2 className={styles.doubleSpan}>Ingen deltakere funnet.</h2>
                    : ""
                }
                {
                    showUsers.map(x => {
                        return (
                            <React.Fragment  key={`${x.name}_${x.club}`}>
                                <p >{x.name}</p>
                                <p>{x.club}</p>
                            </React.Fragment> 
                        )
                    })
                }

            </div>
        </div>
    )
}

export default VinterleirPublic;