import { useEffect, useState } from 'react';
import { SkoleStepProps, SkoleSteps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';
import { sendSkoleRegistration } from '../../services/skoleService';

function SkoleDaysStep(props: SkoleStepProps) {
    const [firstDay, setFirstDay] = useState(props.registration.firstDay);
    const [secondDay, setSecondDay] = useState(props.registration.secondDay);
    const [thirdDay, setThirdDay] = useState(props.registration.thirdDay)


    function validateMinimumDays() {
        return firstDay || secondDay || thirdDay;
    }

    useEffect(() => {
        save();
    }, [firstDay, secondDay, thirdDay])
    
    function save() {
        let registration = props.registration;
        registration.firstDay = firstDay;
        registration.secondDay = secondDay;
        registration.thirdDay = thirdDay;

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
        props.setCurrentStep(SkoleSteps.Receipt);
    }

    return (
        <div className="slideLeft">
            <div className={styles.registrationForm}>
                <div className={`${styles.largeSpan} ${styles.centerize}`}>
                    <h2>Ønsker å delta på disse dagene:</h2>
                </div>
                <div className={`${styles.largeSpan} ${styles.centerize}`}>
                    <div className={`${styles.regCheckbox} ${styles.checkboxCenter}`} onClick={() => setFirstDay(!firstDay)}>
                        <span>Onsdag (14. august)</span>
                        <input id="firstDay" checked={firstDay} type='checkbox' onChange={(e) => { e.stopPropagation(); setFirstDay(e.currentTarget.checked)}} />
                    </div>
                </div>
                <div className={`${styles.largeSpan} ${styles.centerize}`}>
                    <div className={`${styles.regCheckbox} ${styles.checkboxCenter}`} onClick={() => setSecondDay(!secondDay)}>
                        <span>Torsdag (15. august)</span>
                        <input id="secondDay" checked={secondDay} type='checkbox' onChange={e => {e.stopPropagation(); setSecondDay(e.currentTarget.checked)}} />
                    </div>
                </div>
                <div className={`${styles.largeSpan} ${styles.centerize}`}>
                    <div className={`${styles.regCheckbox} ${styles.checkboxCenter}`} onClick={() => setThirdDay(!thirdDay)}>
                        <span>Fredag (16. august)</span>
                        <input id="thirdDay" checked={thirdDay} type='checkbox' onChange={e => {e.stopPropagation(); setThirdDay(e.currentTarget.checked)}} />
                    </div>
                </div>
            </div>

            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton}
                    disabled={
                        !validateMinimumDays()
                    } 
                    onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default SkoleDaysStep;