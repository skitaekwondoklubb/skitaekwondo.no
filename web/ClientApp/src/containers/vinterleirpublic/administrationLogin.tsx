import React, { useEffect, useState } from "react";
import { GetAdminCookie, getAllFullVinterleirUsers, VinterleirFullUser } from "../../services/adminService";
import { deleteCookie, getCookie } from "../../services/cookieService";
import styles from './vinterleiradmin.module.css';

interface AdministrationLoginProps {
    setAuthorized: (auth: boolean) => void;
}

function AdministrationLogin(props: AdministrationLoginProps) {
    const [username, setUsername] = useState("");
    const [pw, setPW] = useState("");
    const [loginError, setLoginError] = useState("");

    function login() {
        GetAdminCookie(username, pw).then((x) => {
            props.setAuthorized(true);
        })
        .catch((e) => {
            props.setAuthorized(false);
            setLoginError("Feil brukernavn/passord.");
        })
    }
    

    return (
        <div className={styles.vinterleirAdminGrid} onKeyDown={(x) => {
            if(x.key === "Enter") {
                login();
            }
        } }>
            <p>Du må logge inn for å komme videre.</p>
            <h3>Brukernavn:</h3>
            <input value={username} onChange={(x) => setUsername(x.currentTarget.value)} />
            <h3>Passord:</h3>
            <input value={pw} type={"password"} onChange={(x) => setPW(x.currentTarget.value)} />
            {
                loginError !== "" && 
                    <p className={styles.red}>{loginError}</p>
            }
            <button className={styles.loginButton} onClick={login}>Logg inn</button>
        </div>
    )
}

export default AdministrationLogin;