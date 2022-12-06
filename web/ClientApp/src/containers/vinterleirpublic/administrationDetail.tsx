import React from "react";
import { VinterleirFullUser } from "../../services/adminService"
import styles from './vinterleiradmin.module.css';

interface AdministrationDetailsProps {
    person: VinterleirFullUser;
    goBack: () => void;
}

function AdministrationDetails(props: AdministrationDetailsProps) {

    return (
        <div className={styles.adminDetails}> 
            <h2>{props.person.firstname} {props.person.lastname} {props.person.isLedsager ? "(Ledsager)" : ""}</h2>

            <div className={styles.detailsGrid}>

                {
                    props.person.isLedsager &&
                    <div>
                        <label>Er ledsager for</label>
                        <p>{props.person.isLedsagerForName}</p>
                    </div>
                }
                <div>
                    <label>Navn</label>
                    <p>{props.person.firstname} {props.person.lastname}</p>
                </div>
                <div>
                    <label>Alder</label>
                    <p>{props.person.age}</p>
                </div>
                <div>
                    <label>Klubb</label>
                    <p>{props.person.club}</p>
                </div>
                <div>
                    <label>Grad</label>
                    <p>{props.person.grade}</p>
                </div>
                <div>
                    <label>Epost</label>
                    <p>{props.person.email}</p>
                </div>
                <div>
                    <label>Telefon</label>
                    <p>{props.person.telephone}</p>
                </div>
                <div>
                    <label>Gradering</label>
                    <p>{props.person.gradering  ? "Ja" : "Nei"}</p>
                </div>
                <div>
                    <label>Overnatter</label>
                    <p>{props.person.sleepover ? "Ja" : "Nei"}</p>
                </div>
                <div>
                    <label>Vises offentlig</label>
                    <p>{props.person.public ? "Ja" : "Nei"}</p>
                </div>
                <div>
                    <label>Skal betale</label>
                    <p>{props.person.amount}</p>
                </div>
                <div>
                    <label>Har betalt</label>
                    <p>{props.person.paid ? "Ja" : "Nei"}</p>
                </div>
                <div>
                    <label>Brukte Vipps</label>
                    <p>{props.person.vipps ? "Ja" : "Nei"}</p>
                </div>
                <div>
                    <label>Veganer</label>
                    <p>{props.person.vegan ? "Ja" : "Nei"}</p>
                </div>
                {
                    props.person.club.startsWith("Ski") &&
                    <div>
                        <label>Er instruktør i Ski</label>
                        <p>{props.person.instructor}</p>
                    </div>
                }

                <div>
                    <label>Master som ønsker å instruere</label>
                    <p>{props.person.wantstoinstruct ? "Ja" : "Nei"}</p>
                </div>
                <div className={styles.fullRow}>
                    <div>
                        <label>Allergier</label>
                        <textarea value={props.person.allergies} disabled={true}/>
                    </div>
                    <div>
                        <label>Annen informasjon</label>
                        <textarea value={props.person.otherinfo} disabled={true}/>
                    </div>
                </div>


                {
                    props.person.vipps &&
                    <React.Fragment>
                        <div>
                            <label>Vipps OrdreId</label>
                            <p>{props.person.orderid}</p>
                        </div>
                        <div>
                            <label>Vipps TransaksjonsId</label>
                            <p>{props.person.transactionid}</p>
                        </div>
                    </React.Fragment>
                }
            </div>
            <button className={styles.loginButton} onClick={props.goBack}>Tilbake til liste</button>

        </div>
    )
}

export default AdministrationDetails;