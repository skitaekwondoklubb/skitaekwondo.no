import { FormEvent, useEffect, useState } from "react";
import Autosuggest, { SuggestionsFetchRequested } from "react-autosuggest";
import { getGrades, Grade } from "../../services/gradeService";

function escapeRegexCharacters(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

interface GradeAutocompleteProps {
    currentSelection?: Grade;
    grades: Grade[];
    setGrade: (grade: Grade) => void;
}

export function GradeAutocomplete(props: GradeAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<Grade[]>([]);
    const [grade, setGrade] = useState(props.currentSelection?.name);
    const grades = props.grades;

    useEffect(() => {
        const newGrade = grades.find(y => y.name === grade);

        if(newGrade != null) {
            props.setGrade(newGrade);
        }
    }, [grade])

    function getSuggestions(value: string) {
        const escapedValue = escapeRegexCharacters(value.trim());
  
        if (escapedValue === '') {
          return [];
        }
        return grades.filter(grade => 
            `${grade.grade}. ${grade.isDan ? "Dan" : "Cup"} ${!grade.isDan ? "(" + grade.name + ")" : ""}`.toLowerCase()
                .includes(escapedValue.toLowerCase())
        );
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
                    <span>{suggestion.grade}. {suggestion.isDan ? "Dan" : "Cup"} {!suggestion.isDan ? `(${suggestion.name})` : ""}</span>
                </div>
            )}
            inputProps={{
                value: grade ?? "",
                onChange: setGradeValue
            }}
        />
    )
}