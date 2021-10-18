import React, { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";
import { GradeAutocomplete } from "./gradeautocomplete";
import ClubAutocomplete from "./clubautocomplete";
import { Grade, Registration } from "../../models/registrationModels";
import { ttuClubs } from '../../services/clubService';
import { Instructor } from "../../models/instructor";

interface IsInstructorProps {
    club: string;
    grade: Grade | null;
    age: number;
    setInstructor: (ins: Instructor) => void;
    instructor: Instructor | undefined; 
}

function IsInstructor(props: IsInstructorProps) {
    if(props.club === "Ski Taekwondo Klubb" && props.age > 12)
        return (
            <>
                <p>Instruktør:</p>
                <select className={`${styles.instructor}`} value={props.instructor} onChange={x => props.setInstructor(Number.parseInt(x.currentTarget.value))}>
                    <option value={Instructor.NotInstructor}>Jeg er ikke instruktør</option>
                    <option value={Instructor.SkiFullTimeInstructor} hidden={props.club !== "Ski Taekwondo Klubb"}>Er hovedinstruktør i Ski</option>
                    <option value={Instructor.SkiHelperInstructor} hidden={props.club !== "Ski Taekwondo Klubb"}>Er hjelpeinstruktør i Ski</option>
                </select>
            </>
        )
    return <></>
}

function ClubGrade(props: StepProps) {
    const [clubs, setClubs] = useState(ttuClubs);
    const [club, setClub] = useState<string>(props?.registration?.club ?  props.registration.club : "");
    const [grade, setGrade] = useState<Grade | null>(
        props?.registration?.grade 
        ? props.registration.grade 
        : null
    );
    const [instructor, setInstructor] = useState<Instructor | undefined>(props.registration.instructor);

    function save() {
        let registration = {... props.registration};

        registration.grade = grade;
        registration.club = club;

        if(club === "Ski Taekwondo Klubb" || (grade?.dan === true && grade.grade >= 4)) {
            registration.instructor = instructor;
        }
        else {
            registration.instructor = Instructor.NotInstructor
        }

        props.setRegistration(registration);
    }

    function goBack() {
        save();
        if(typeof(props.prevStep) === "number") {
            props.setCurrentStep(props.prevStep);
        }
    }

    function nextStep() {
        save();
        if(typeof(props.nextStep) === "number") {
            props.setCurrentStep(props.nextStep);
        }
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
                <IsInstructor age={props.registration.age} instructor={instructor} club={club} grade={grade} setInstructor={setInstructor} />
            </div>
            <div className={styles.masterDisclaimer} hidden={grade == null || grade?.dan === false || (grade != null && grade.dan === true && grade.grade < 4)}>
                <h3>Alle mastere betaler uansett for leieren. Noen få utvalgte får refusjon igjennom godtgjørelse.</h3>
                <h3>Grandmaster Svein Anderstuen og Master Tom Lasse Karlsen tar godtgjørelse med de som er aktuelle.</h3>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton}  disabled={club === "" || grade == null} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default ClubGrade;