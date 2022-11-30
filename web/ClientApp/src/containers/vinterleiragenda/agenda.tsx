import React, { useEffect, useState } from "react";
import { AgendaRow } from "./agendaBox";
import { AgendaGrade, gradeColors, ShowTypes } from "./agendaData";
import { AgendaDay, fredag, lordag, sondag } from "./agendaDays";
import styles from './agenda.module.css';
import './agendaColors.module.css';
import AgendaFilter from "./agendaFilter";
import { getCookie, setCookie } from "../../services/cookieService";

export const days: AgendaDay[] = [
    fredag, lordag, sondag
]

interface SavedAgendaSettings {
    showType: ShowTypes;
    showGrade?: number;
}


function Agenda() {
    const vinterleirdays = days;
    const [selectedDay, setSelectedDay] = useState(0); 
    const [showType, setShowType] = useState<ShowTypes>(ShowTypes.All);
    const [showGrade, setShowGrade] = useState<number | undefined>();

    useEffect(() => {
        var currentDay = new Date().getDate();

        switch (currentDay) {
            case 2:
                setSelectedDay(0);
                break;
            case 3:
                setSelectedDay(1);
                break;
            case 4:
                setSelectedDay(2);
                break;
            default:
                setSelectedDay(0);
                break;
        }

        const cookie = getCookie("agenda");

        if(cookie != null && cookie !== "") {
            const parsedSettings: SavedAgendaSettings = JSON.parse(cookie);
            setShowType(parsedSettings.showType);
            setShowGrade(parsedSettings.showGrade);
        }

    }, []);

    useEffect(() => {
        const newSettings: SavedAgendaSettings = {
            showGrade: showGrade,
            showType: showType
        }

        setCookie("agenda", JSON.stringify(newSettings), 14);
    }, [showType, showGrade])

    return (
        <div className={styles.agenda}>
            <div className={styles.agendaWidth}>
                <h1>Program - Vinterleir 2022</h1>
                <AgendaFilter showType={showType} setShowType={setShowType} showGrade={showGrade} setShowGrade={setShowGrade}/> 

                <div className={styles.buttons}>
                    <button onClick={() => setSelectedDay(0)} className={selectedDay === 0 ? styles.selectedBtn : ""}>Fredag</button>
                    <button onClick={() => setSelectedDay(1)} className={selectedDay === 1 ? styles.selectedBtn : ""}>Lørdag</button>
                    <button onClick={() => setSelectedDay(2)} className={selectedDay === 2 ? styles.selectedBtn : ""}>Søndag</button>
                </div>

                <div>
                    {
                        vinterleirdays[selectedDay].rows
                        .map((row, index) => {
                            return (
                                <AgendaRow row={row} showGrade={showGrade != null ? gradeColors[showGrade] : null} showTypes={showType} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Agenda;
