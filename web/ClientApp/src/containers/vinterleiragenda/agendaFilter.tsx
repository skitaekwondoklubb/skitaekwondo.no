import React from "react";
import { gradeColors, ShowTypes } from "./agendaData";
import styles from './agenda.module.css';

interface AgendaFilterProps {
    showType: ShowTypes;
    setShowType: (type: ShowTypes) => void;
    showGrade: number | undefined;
    setShowGrade: (grade: number | undefined) => void;
}

function AgendaFilter(props: AgendaFilterProps) {

    function setTarget(x: React.SyntheticEvent<HTMLSelectElement, Event>) {
        console.log("Settings: "  + x.currentTarget.value);
        let value = Number.parseInt(x.currentTarget.value);
        if(value === -1) {
            props.setShowGrade(undefined);
        }
        else {
            props.setShowGrade(value);
        }
    }


    return (
        <div className={styles.agendaFilter}>
            <div className={styles.mergedButton}>
                <button onClick={() => props.setShowType(ShowTypes.All)} className={`${styles.mergedButtonOne} ${props.showType === ShowTypes.All && styles.selectedBtn}`}>Alle</button>
                <button onClick={() => props.setShowType(ShowTypes.Children)} className={`${styles.mergedButtonTwo} ${props.showType === ShowTypes.Children && styles.selectedBtn}`}>Barn</button>
                <button onClick={() => props.setShowType(ShowTypes.Grown)} className={`${styles.mergedButtonThree} ${props.showType === ShowTypes.Grown && styles.selectedBtn}`}>Ungdom/Voksen</button>
            </div>

            <div>
                <h3>Grad:</h3>
                <select onChange={(x) => setTarget(x)} value={props.showGrade}>
                    <option value={-1}>Alle</option>
                    {
                        gradeColors.map((grade, index) => {
                            return (
                                <option value={index}>{grade.color}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default AgendaFilter;