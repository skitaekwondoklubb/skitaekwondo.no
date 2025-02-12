import { useEffect, useState } from "react";
import { GetAllNewMembers, NewMemberDataUser, getAllNewMembersCSV, removeNewMember } from "../../../services/newmemberAdminService";
import { deleteCookie, getCookie } from "../../../services/cookieService";
import styles from './newmember.module.css';
import NewMemberAdministrationLogin from "./newmemberlogin";
import trashsvg from "./trash-svgrepo-com.svg";

function NewMemberAdministration() {
    const [people, setPeople] = useState<NewMemberDataUser[]>([]);
    const [authorized, setAuthorized] = useState(getCookie("newMemberToken") !== "");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
       getUsers();
    }, [authorized]);

    function getUsers() {
        if(authorized) {
            setLoading(true);
            GetAllNewMembers().then((x) => {
                setPeople(x);
                setLoading(false);
            })
            .catch((e) => {
                setAuthorized(false);
                deleteCookie("newMemberToken");
                setLoading(false);
            })
        }
    }

    if(loading) {
        return (
            <div className={styles.newmemberAdminGrid}>
                <h2>Laster inn, vennligst vent...</h2>
            </div>
        )
    }
    
    if(authorized && people.length > 0) {
        return (
            <div className={styles.newmemberAdminGrid}>
                <div className={`${styles.header}`}>
                    <h1>Nye medlemmer</h1>
                </div>
                <a href={"#"} onClick={getAllNewMembersCSV} >Last ned Excel skjema av nye medlemmer med informasjon</a>
                <div className={styles.dataContainer}>
                    <div className={styles.peopleGrid}>
                        {
                            people.map((x) => {
                                return (
                                    <NewMemberBox data={x} refresh={() => getUsers()} />
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        );
    }

    return (
        <NewMemberAdministrationLogin setAuthorized={setAuthorized}/>
    )
}

function NewMemberBox(props: NewMemberRowData) {
        const [confirmDelete, setConfirmDelete] = useState(false);

        function remove() {
            removeNewMember(props.data).then(() => {
                setConfirmDelete(false);
                props.refresh();
            }).catch((e) => {
                console.log(`Failed to remove ${props.data.registrationId}`);
                console.log(e);
            })
        }

        if(confirmDelete) {
            return (<div className={`${styles.newmemberBox} ${styles.newmemberBoxFilled}`}>
                <h4 className={`${styles.longText}`}>Vil du slette {props.data.firstname} {props.data.lastname}?</h4>
                <button onClick={remove}>Ja</button>
                <button onClick={() => {setConfirmDelete(false)}} className={styles.sendEmailButton}>Nei</button>
            </div>)
        }

        return (
            <div className={styles.newmemberBox}>
                <h4>Navn:</h4>
                <h4>Alder</h4>
                <span>{props.data.firstname} {props.data.lastname}</span>
                <span>{props.data.age} år</span> 
                <h4>E-post:</h4>
                <h4>Telefon:</h4>
                <span>{props.data.email}</span>
                <span>{props.data.telephone}</span>
                <h4>Foresatts navn:</h4>
                <h4>Registrert:</h4>
                <span>{props.data.parentfirstname} {props.data.parentlastname}</span>
                <span>{new Date(props.data.registrationdate).toLocaleDateString("nb-NO")}</span>
                <h4>Referert fra:</h4>
                <h4/>
                <span>{props.data.referer}</span>
                <span/>

                <button onClick={() => window.location.href = `mailto:${props.data.email}`} className={styles.sendEmailButton}>Send e-post</button>
                <button onClick={() => {setConfirmDelete(true)}}>Slett</button>
            </div>
        );
}

interface NewMemberRowData {
    data: NewMemberDataUser;
    refresh: () => void;
}

export default NewMemberAdministration;