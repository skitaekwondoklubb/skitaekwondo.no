import React, { useEffect, useState } from "react";
import { GetAdminCookie, getAllFullVinterleirUsers, getAllFullVinterleirUsersCSV, VinterleirFullUser } from "../../services/adminService";
import { deleteCookie, getCookie } from "../../services/cookieService";
import AdministrationDetails from "./administrationDetail";
import AdministrationLogin from "./administrationLogin";
import styles from './vinterleiradmin.module.css';

function VinterleirAdministration() {
    const [people, setPeople] = useState<VinterleirFullUser[]>([]);
    const [authorized, setAuthorized] = useState(getCookie("adminToken") !== "");
    const [showUser, setShowUser] = useState<VinterleirFullUser | null>(null);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
       getUsers();
    }, [authorized]);

    function getUsers() {
        if(authorized) {
            setLoading(true);
            getAllFullVinterleirUsers().then((x) => {
                setPeople(x);
                setLoading(false);
            })
            .catch((e) => {
                setAuthorized(false);
                deleteCookie("adminToken");
                setLoading(false);
            })
        }
    }

    if(authorized && showUser) {
        return <AdministrationDetails person={showUser} goBack={() => setShowUser(null)}/>
    }

    if(loading) {
        return (
            <div className={styles.vinterleirAdminGrid}>
                <h2>Laster inn, vennligst vent...</h2>
            </div>
        )
    }

    
    if(authorized && people.length > 0) {
        return (
            <div className={styles.vinterleirAdminGrid}>
                <h1>Vinterleiradministrasjon</h1>
                <p>Klikk på en deltaker for mer informasjon.</p>
                <a href={"#download"} onClick={getAllFullVinterleirUsersCSV} >Last ned Excel skjema av deltakerliste med informasjon.</a>
                <div className={styles.peopleGrid}>
                    <div className={styles.headerGrid}>
                        <span>Navn:</span>
                        <span>Klubb:</span>
                        <span className={styles.noMobile}>Grad:</span>
                        <span className={styles.noMobile}>Betalt:</span>
                    </div>
                    {
                        people.map((x) => {
                            return (
                                <div className={styles.peopleRow} onClick={() => setShowUser(x)}>
                                    <span>{x.firstname} {x.lastname} {x.isLedsager ? "(Ledsager)" : ""}</span>
                                    <span>{x.club}</span>
                                    <span className={styles.noMobile}>{x.grade}</span>
                                    <span className={styles.noMobile} title={x.vipps ? "Vipps" : "Kontant"}>{x.paid ? "Ja" : "Nei"}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }

    return (
        <AdministrationLogin setAuthorized={setAuthorized}/>
    )
}

export default VinterleirAdministration