import React, { useEffect, useState } from "react";
import { GetAdminCookie } from "../../../services/newmemberAdminService";
import styles from './newmember.module.css';

interface AdministrationLoginProps {
    setAuthorized: (auth: boolean) => void;
}

function NewMemberAdministrationLogin(props: AdministrationLoginProps) {
    const [pw, setPW] = useState("");
    const [loginError, setLoginError] = useState("");

    function login() {
        GetAdminCookie(pw).then(() => {
            props.setAuthorized(true);
        })
        .catch(() => {
            props.setAuthorized(false);
            setLoginError("Feil passord.");
        })
    }
    

    return (
        <div className={styles.newmemberAdminGrid} onKeyDown={(x) => {
            if(x.key === "Enter") {
                login();
            }
        } }>
            <p>Du må logge inn for å komme videre.</p>
            <input value={pw} type={"password"} onChange={(x) => setPW(x.currentTarget.value)} />
            {
                loginError !== "" && 
                    <p className={styles.red}>{loginError}</p>
            }
            <div>
            <button className={styles.loginButton} onClick={login}>Logg inn</button>
            </div>
        </div>
    )
}

export default NewMemberAdministrationLogin;