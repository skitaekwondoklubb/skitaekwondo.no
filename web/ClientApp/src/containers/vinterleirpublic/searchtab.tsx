import React, { useEffect, useState } from 'react';
import { getVinterleirUsers, VinterleirUser } from '../../services/vinterleirService';
import styles from './vinterleirpublic.module.css';

interface VinterleirPublicSearchProps {
    setSearch: (str: string) => void;
    setSearchClub: (str: string) => void; 
    searchClub: string;
    search: string;
    users: VinterleirUser[];
    showUsers: VinterleirUser[];
    errors: boolean;
}

function VinterleirPublicSearch(props: VinterleirPublicSearchProps) {
    return (
        <div className='slideLeft'>
            <p>Her kan du se registrerte deltakere på vinterleieren.</p>
            <p className={styles.lessMarginTop}>Man vises med navn og grad her kun dersom man har gitt samtykke til å vises offentlig.</p>
            <p className={styles.lessMarginTop}>Hvis du valgte feil undre registrering, ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a> for å endre valget.</p>

            <div className={styles.searchHeader}>
                <div>
                    <h2>Navn:</h2>
                    <input onChange={x => props.setSearch(x.currentTarget.value)} value={props.search}/>
                </div>
                <div>
                    <h2>Klubb:</h2>
                    <input onChange={x => props.setSearchClub(x.currentTarget.value)} value={props.searchClub}/>
                </div>

            </div>
            {
                props.users != null && props.showUsers != null && props.users.length > 0  
                ?  
                <div className={styles.amountOfUsers}>
                    <h3>Viser {props.showUsers.length} av {props.users.length} registrerte deltakere.</h3>
                </div>
                :
                <span/>
            }
            <div className={styles.usersGrid}>
                <span><b>Navn:</b></span>
                <span><b>Grad:</b></span>
                <span><b>Klubb:</b></span>
                <div className={styles.gridSplitter}>
                    <span/>
                </div>
                {
                    props.errors === true
                    ? <h2 className={styles.doubleSpan}>Klarte ikke laste data.</h2>
                    : ""
                }
                {
                    props.users.length === 0 && props.errors === false
                    ? <h2 className={styles.doubleSpan}>Laster...</h2>
                    : ""
                }
                {
                    props.showUsers.length === 0 && props.users.length > 0
                    ? <h2 className={styles.doubleSpan}>Ingen deltakere funnet.</h2>
                    : ""
                }
                {
                    props.showUsers.map(x => {
                        return (
                            <React.Fragment  key={`${x.name}_${x.club}`}>
                                <p>{x.name}</p>
                                <p>{x.grade}</p>
                                <p>{x.club}</p>
                            </React.Fragment> 
                        )
                    })
                }
            </div>
        </div>
    )
}

export default VinterleirPublicSearch;