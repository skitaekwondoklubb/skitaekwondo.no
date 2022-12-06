import { AgendaGrade, AgendaHappening, AgendaRowData, ShowTypes } from "./agendaData";
import styles from './agenda.module.css';
import React from "react";

interface AgendaRowProps {
    row: AgendaRowData;
    showTypes: ShowTypes;
    showGrade: AgendaGrade | null;
}

export function AgendaRow(props: AgendaRowProps) {
    const rowsAfterFilter = props.row.happenings
    .filter(x => props.showTypes === ShowTypes.All || (x.type === ShowTypes.All || props.showTypes === x.type))
    .filter(x => (props.showGrade === null || x.who.length === 0 || (x.who.find(y => y.color === props.showGrade?.color) != null)));
    const single = rowsAfterFilter.length === 1;

    if(rowsAfterFilter.length > 0) {
        return (
            <div className={styles.agendaRow}>
                <label className={`${styles.bold} ${styles.topperMargin}`}>{props.row.when}</label> 
                <div className={single ? styles.agendaCommonBox : styles.agendaMultiBox}>
                    {
                        rowsAfterFilter
                        .map(happenan => {
                            return (
                                <AgendaBox agenda={happenan} single={single} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return <React.Fragment></React.Fragment>;

}
interface AgendaBoxProps {
    agenda: AgendaHappening;
    single: boolean;
}

function AgendaBox(props: AgendaBoxProps) {
    return (
        props.single ? <SingleBox {... props}/> : <MultiBox {... props}/>
    )
}

function findGradeSpan(grades: AgendaGrade[]) {
    const first = grades[0];
    const last = grades[grades.length-1];

    if(first === last) {
        return  `${first.color}`
    }

    let concat = `${first.nr}. ${first.dan ? "Dan" : "Cup"} - `;
    if(first.dan) {
        concat = `${first.color} - `
    }

    if(last.dan) {
        concat += `${last.color}`
    }
    else {
        concat += `${last.nr}. ${last.dan ? "Dan" : "Cup"}`;
    }

    return concat;
}

function findGradeNameSpan(grades: AgendaGrade[]) {
    const first = grades[0];
    var last = grades[grades.length-1];
 
    if(first === last || (first.dan && last.dan)) {
        return  ``
    }

    let concat = `(${first.color} - ${last.color})`;

    return concat;
}

function MultiBox(props: AgendaBoxProps) {
    return (
        <div className={`${styles.agendaBox} ${props.agenda.class} ${props.single ? styles.singleBox : styles.normalBox}`}>
            <h2>{props.agenda.what}</h2>
            <label className={styles.where}>{props.agenda.where}</label>
            <label className={styles.boxChildren}>{props.agenda.type === ShowTypes.Children ? "Barn 👧 (8-11 år)" : ""}</label>
            <h3>{ !props.agenda.override && props.agenda.who.length === 0 && "Alle" }</h3>
            <h3>{ props.agenda.override && props.agenda.override }</h3>
            <p>{ !props.agenda.override && props.agenda.who.length > 0 && findGradeSpan(props.agenda.who) }</p>
            <small className={styles.boxGradeName}>{ props.agenda.who.length > 0 && findGradeNameSpan(props.agenda.who) }</small>

            <label className={styles.when}>{props.agenda.when}</label>
        </div>
    )
}

function SingleBox(props: AgendaBoxProps) {
    return (
        <div className={`${styles.agendaBox} ${props.agenda.class} ${props.single ? styles.singleBox : styles.normalBox}`} >
            <h2>{props.agenda.what}</h2>
            <label className={styles.boxChildren}>{props.agenda.type === ShowTypes.Children ? "Barn 👧 (8-11 år)" : ""}</label>
            <h3>{ !props.agenda.override && props.agenda.who.length === 0 && "Alle" }</h3>
            <h3>{ props.agenda.override && props.agenda.override }</h3>
            <p>{ !props.agenda.override && props.agenda.who.length > 0 && findGradeSpan(props.agenda.who) }</p>
            <small className={styles.boxGradeName}>{ props.agenda.who.length > 0 && findGradeNameSpan(props.agenda.who) }</small>

            <label className={styles.where}>{props.agenda.where}</label>
            <label className={styles.when}>{props.agenda.when}</label>

    </div>
    )
}

export default AgendaBox;