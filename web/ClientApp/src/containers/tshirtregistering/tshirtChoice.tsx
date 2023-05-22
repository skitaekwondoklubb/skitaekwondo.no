import { useEffect, useState } from 'react';
import { TShirtStepProps, TShirtSteps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';
import { TShirtModel, TShirtSizesChildren, TShirtSizesCommon, TShirtSizesMan } from '../../models/tshirtsizes';
import React from 'react';

function AddTShirt(props: TShirtStepProps) {
    const [model, setModel] = useState<TShirtModel>(TShirtModel.Child);
    const [size, setSize] = useState<TShirtSizesCommon | TShirtSizesMan | TShirtSizesChildren>(TShirtSizesChildren.TwoToThree);

    const [modelError, setModelError] = useState("");
    const [sizeError, setSizeError] = useState("");

    // If you change model, reset size.
    useEffect(() => {
        if(model === TShirtModel.Child) {
            setSize(TShirtSizesChildren.TwoToThree);
        }
        else {
            setSize(TShirtSizesCommon.M);
        }
    }, [model])


    function validateModel(model: string) {
        if(model === TShirtModel.Child) {
            setModel(TShirtModel.Child);
        }
        else if(model === TShirtModel.Woman) {
            setModel(TShirtModel.Woman);
        }
        else {
            setModel(TShirtModel.Man);
        }

        if(model == null) { setModelError("Du må velge en modell.") }
        else setModelError("");
    }

    function validateSize(size: string) {
        const foundSize: TShirtSizesCommon | TShirtSizesMan | TShirtSizesChildren = findSizeByString(model, size); 
        setSize(foundSize);
        if(size == null) { setSizeError("Du må legge inn en størrelse.") }
        else setSizeError("");
    }

    function save() {
        let registration = props.registration;
        const tshirts = registration.tshirts;
        registration.tshirts = [...tshirts, { model: model, size: size }];

        props.setRegistration(registration);
    }
    
    function goBack() {
        if(typeof(props.prevStep) === "number") {
            props.setCurrentStep(props.prevStep);
        }
    }

    function nextStep() {
        save();
        props.setCurrentStep(TShirtSteps.Information);

    }

    return (
        <div className="slideLeft">
            <div className={styles.registrationForm}>
                <p>Modell:</p>
                <select id="publicSelectBox" value={model} onChange={x => validateModel(x.currentTarget.value)}>
                    <option>{TShirtModel.Child}</option>
                    <option>{TShirtModel.Woman}</option>
                    <option>{TShirtModel.Man}</option>
                </select>
                <p>Størrelse:</p>
                <select id="publicSelectBox" value={size} onChange={x => validateSize(x.currentTarget.value)}>
                    {
                        model === TShirtModel.Child && <React.Fragment>
                            <option value={TShirtSizesChildren.TwoToThree}>{TShirtSizesChildren.TwoToThree} år</option>
                            <option value={TShirtSizesChildren.FourToSix}>{TShirtSizesChildren.FourToSix} år</option>
                            <option value={TShirtSizesChildren.EightToTen}>{TShirtSizesChildren.EightToTen} år</option>
                            <option value={TShirtSizesChildren.TwelveToFourteen}>{TShirtSizesChildren.TwelveToFourteen} år</option>
                        </React.Fragment>
                    }
                    {
                        model !== TShirtModel.Child && <React.Fragment>
                            <option>{TShirtSizesCommon.S}</option>
                            <option>{TShirtSizesCommon.M}</option>
                            <option>{TShirtSizesCommon.L}</option>
                            <option>{TShirtSizesCommon.XL}</option>
                            <option>{TShirtSizesCommon.XXL}</option>
                        </React.Fragment>
                    }
                    {
                        model === TShirtModel.Man && <React.Fragment>
                            <option>{TShirtSizesMan.XXXL}</option>
                        </React.Fragment>
                    }
                </select>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton}
                    disabled={
                        modelError !== ""  || sizeError !== ""
                    } 
                    onClick={nextStep}>Legg til</button>
            </div>
        </div>
    )
}

function findSizeByString(model: TShirtModel, size: string): any {
    if(model == TShirtModel.Child) {
        for (const [key, value] of Object.entries(TShirtSizesChildren)) {
            if(size == value) {
                return value;
            }
        }
    }
    else if(model === TShirtModel.Man || model === TShirtModel.Woman) {
        for (const [key, value] of Object.entries(TShirtSizesCommon)) {
            if(size == value) {
                return value;
            }
        }

        if(model === TShirtModel.Man) {
            if(size === TShirtSizesMan.XXXL) {
                return TShirtSizesMan.XXXL;
            }
        }
    }
    throw Error("Størrelse ikke funnet");
}


export default AddTShirt;