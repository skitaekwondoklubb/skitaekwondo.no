import React, { useEffect, useState } from "react";
import { AgendaRow } from "./agendaBox";
import { AgendaDay, fredag, lordag, sondag } from "./agendaDays";
import styles from './agenda.module.css';
import './agendaColors.module.css';
import { ShowTypes } from "./agendaData";
import { useLocation } from "react-router";


export const days: AgendaDay[] = [
    fredag, lordag, sondag
]

interface SavedAgendaSettings {
    showType: ShowTypes;
    showGrade?: number;
}


function PrintAgenda() {
    const vinterleirdays = days;
    const location = useLocation();
    const split = location.pathname.split("/");
    const selectedDay = Number.parseInt(split[split.length-1] ?? "0") ?? 0;

    function getDay() {
        switch (selectedDay) {
            case 1:
                return "Lørdag"
            case 2:
                return "Søndag"    
            default:
                return "Fredag"
        }
    }

    
    return (
        <div className={styles.agenda}>
            <div className={styles.agendaWidthPrint}>
                <h1 className={`${styles.agendaPrintTitle}`}>Program - Vinterleir 2023</h1>

                <h2 className={`${styles.agendaPrintHeader}`}>{getDay()}</h2>
                <div>
                    {
                        vinterleirdays[selectedDay].rows
                        .map((row, index) => {
                            return (
                                <AgendaRow row={row} showGrade={null} showTypes={ShowTypes.All} />
                            )
                        })
                    }
                </div>
                <p>Programmet finnes også på <u><b>https://skitaekwondo.no</b></u> hvor du kan tilpasse alt til din beltegrad!</p>

            </div>
        </div>
    )
}

export default PrintAgenda;
