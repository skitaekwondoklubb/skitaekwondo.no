import React, { useEffect, useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";
import { GradeAutocomplete } from "./gradeautocomplete";
import ClubAutocomplete from "./clubautocomplete";
import { Instructor } from "../../models/instructor";
import { Club, getClubs } from "../../services/clubService";
import { getGrades, Grade } from "../../services/gradeService";

interface IsInstructorProps {
    club: string;
    gradeId: number;
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
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState<Club[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [club, setClub] = useState<Club>();
    const [grade, setGrade] = useState<Grade>();
    const [instructor, setInstructor] = useState<Instructor>(props?.registration?.instructor);

    useEffect(() => {
        setLoading(true);
        getClubs().then((x) => {
            setClubs(x);


            if(props.registration.clubId > 0) {
                setClub(x.find(y => y.clubId === props.registration.clubId));
            }
            
        }).then(() => getGrades().then((x) => {
            setGrades(x);

            if(props.registration.gradeId > 0) {
                setGrade(x.find(y => y.gradeId === props.registration.gradeId));
            }
        }).finally(() => setLoading(false))
        )

    }, [])


    function save() {
        let registration = {... props.registration};


        if(grade != null) {
            registration.gradeId = grade.gradeId;
        }

        if(club != null){
            registration.clubId = club.clubId;
        }

        if(club?.name === "Ski Taekwondo Klubb" || (grade?.isDan === true && grade.grade >= 4)) {
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
                {!loading ? <ClubAutocomplete currentSelection={club} clubs={clubs} setClub={setClub} /> : <input placeholder="Laster klubber..."/> }
                <p>Beltegrad:</p>
                {!loading ? <GradeAutocomplete currentSelection={grade} grades={grades ?? []} setGrade={setGrade}/>  : <input placeholder="Laster belter..."/> }
                <IsInstructor age={props.registration.age} instructor={instructor} club={club?.name ?? ""} gradeId={grade?.gradeId ?? 0} setInstructor={setInstructor} />
            </div>
            <div className={styles.masterDisclaimer} hidden={grade == null || grade?.gradeId < 18}>
                <h3>Alle mastere betaler uansett for leieren. Noen få utvalgte får refusjon igjennom godtgjørelse.</h3>
                <h3>Grandmaster Svein Anderstuen og Master Tom Lasse Karlsen tar godtgjørelse med de som er aktuelle.</h3>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} disabled={club?.clubId === 0 || grade == null} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default ClubGrade;