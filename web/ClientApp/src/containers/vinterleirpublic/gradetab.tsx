import React, { useEffect, useState } from 'react';
import { getVinterleirUsers, VinterleirGradeStatistic, VinterleirUser } from '../../services/vinterleirService';
import styles from './vinterleirpublic.module.css';

interface VinterleirPublicGradesProps {
    grades: VinterleirGradeStatistic[];
    error: boolean;
}

function VinterleirPublicGrades(props: VinterleirPublicGradesProps) {
    return (
        <div className='slideLeft'>
            <p>Her kan du se antallet registrerte deltakere på vinterleieren utifra beltegrad.</p>
            <p className={styles.lessMarginTop}>Alle påmeldte deltakere er i denne statistikken.</p>
            <div className={`${styles.gradeGrid}`}>
                {
                    props.error &&
                    <h2 className={styles.doubleSpan}>Feil: Klarte ikke hente grader.</h2>
                }
                {
                    props.error === false &&
                    <h2 className={styles.doubleSpan}>Cup</h2>
                }
                {
                    props.grades.filter(y => y.grade.isDan === false).map(x => {
                        return (
                            <div>
                                <label>{x.grade.grade}. Cup</label>
                                <p>{x.amount}</p>
                            </div>
                        )
                    })
                }

                {
                    props.error === false &&
                    <h2 className={styles.doubleSpan}>Dan</h2>
                }
                {
                    props.grades.filter(y => y.grade.isDan).map(x => {
                        return (
                            <div>
                                <label>{x.grade.grade}. Dan</label>
                                <p>{x.amount}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default VinterleirPublicGrades;