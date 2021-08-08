import React, { useState } from "react";
import { Grade } from "../../services/vinterleirService";
import styles from './registration.module.css';
import { StepProps, Steps } from "./vinterleirRegistrationRoute";
import Autosuggest from 'react-autosuggest';
import { GradeAutocomplete } from "./gradeautocomplete";
import ClubAutocomplete from "./clubautocomplete";


function ClubGrade(props: StepProps) {
    const [clubs, setClubs] = useState(["Ski Taekwondo Klubb", "Hamar Taekwondo Klubb", "Bergen Taekwondo Klubb"]);
    const [club, setClub] = useState<string>(props.registration.club);
    const [grade, setGrade] = useState<Grade | null>(props.registration.grade);
    const [gradering, setGradering] = useState(props.registration.gradering);

    function save() {
        let registration = {... props.registration};

        registration.grade = grade;
        registration.club = club;
        registration.gradering = gradering;
        props.setRegistration(registration);
    }

    function goBack() {
        save();
        props.setCurrentStep(Steps.EmailTelephone);
    }

    function nextStep() {
        save();
        props.setCurrentStep(Steps.Sleepover);
    }

    return (
        <div className="slideLeft">
            <p>Her kan du finne din klubb og beltegrad.</p>
            <p>Dersom din klubb ikke er i listen, ta kontakt med oss så vil vi legge den til!</p>
            <div className={styles.registrationForm}>
                <p>Klubb:</p>
                <ClubAutocomplete currentSelection={club} clubs={clubs} setClub={setClub} />
                <p>Beltegrad:</p>
                <GradeAutocomplete currentSelection={grade} setGrade={setGrade}/>
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setGradering(!gradering)}>
                    <input type="checkbox" checked={gradering} onChange={x => setGradering(x.currentTarget.checked)}/>
                    <span>Delta på gradering under vinterleir</span>
                </div>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton}  disabled={club === "" || grade == null} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default ClubGrade;