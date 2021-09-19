import { FormEvent, useEffect, useState } from "react";
import Autosuggest, { SuggestionsFetchRequested } from "react-autosuggest";
import { Grade } from "../../models/registrationModels";
import { getGrades } from "../../services/vinterleirService";

function escapeRegexCharacters(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

interface GradeAutocompleteProps {
    currentSelection: Grade | null;
    setGrade: (grade: Grade | null) => void;
}

export function GradeAutocomplete(props: GradeAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<Grade[]>([]);
    const grades = getGrades();
    const [grade, setGrade] = useState(
        props.currentSelection != null 
        ? `${props.currentSelection.grade}. ${props.currentSelection.dan ? "Dan" : "Cup"}` 
        : "");

    useEffect(() => {
        console.log("Checking if Cup or Dan");
        if(grades != null && (grade.toLowerCase().endsWith("cup") || grade.toLowerCase().endsWith("dan"))) {
            const foundGrade = grades.find(x => x.name.toLowerCase().startsWith(grade.toLowerCase()));
            if(foundGrade != null) {
                props.setGrade(foundGrade);
                return;
            }
        }
        props.setGrade(null);
    }, [grade])

    function getSuggestions(value: string) {
        const escapedValue = escapeRegexCharacters(value.trim());
  
        if (escapedValue === '') {
          return [];
        }
      
        return grades.filter(grade => grade.name.toLowerCase().includes(escapedValue.toLowerCase()));
    }

    const onSuggestionsFetch: SuggestionsFetchRequested = (request) => {
        setSuggestions(getSuggestions(request.value));
    }

    function setGradeValue(event: FormEvent<any>, object: { newValue: string, method: string}) {
        const regexp = new RegExp(" \\(.*");
        let myGrade = object.newValue;
        myGrade = myGrade.replace(regexp, "");
        setGrade(myGrade);
    }

    return (
        <Autosuggest 
            suggestions={suggestions}
            getSuggestionValue={(aGrade: Grade) => aGrade.name}
            onSuggestionsFetchRequested={onSuggestionsFetch}
            renderSuggestion={(suggestion: Grade) => (
                <div>
                    <span>{suggestion.grade}. {suggestion.dan ? "Dan" : "Cup"} {!suggestion.dan ? `(${suggestion.color})` : ""}</span>
                </div>
            )}
            inputProps={{
                value: grade,
                onChange: setGradeValue
            }}
        />
    )
}