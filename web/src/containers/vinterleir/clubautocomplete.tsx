import { FormEvent, useEffect, useState } from "react";
import Autosuggest, { SuggestionsFetchRequested } from "react-autosuggest";

function escapeRegexCharacters(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

interface ClubAutocompleteProps {
    currentSelection: string;
    clubs: string[];
    setClub: (club: string) => void;
}

function ClubAutocomplete(props: ClubAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [club, setClub] = useState(props.currentSelection);

    useEffect(() => {
        const foundClub = props.clubs.find(x => x.toLowerCase() === club.toLowerCase());
        
        if(foundClub != null) {
            props.setClub(foundClub);
            console.log("Setting CLUB");
        }
    }, [club])

    function getSuggestions(value: string) {
        const escapedValue = escapeRegexCharacters(value.trim());
  
        if (escapedValue === '') {
          return [];
        }
      
        return props.clubs.filter(club => club.toLowerCase().includes(escapedValue.toLowerCase()));
    }

    const onSuggestionsFetch: SuggestionsFetchRequested = (request) => {
        setSuggestions(getSuggestions(request.value));
    }

    function setClubValue(event: FormEvent<any>, object: { newValue: string, method: string}) {
        setClub(object.newValue);
    }

    return (
        <Autosuggest 
            suggestions={suggestions}
            getSuggestionValue={(aclub: string) => aclub}
            onSuggestionsFetchRequested={onSuggestionsFetch}
            renderSuggestion={(suggestion: string) => (
                <div>
                    <span>{suggestion}</span>
                </div>
            )}
            inputProps={{
                value: club,
                onChange: setClubValue
            }}
        />
    )
}

export default ClubAutocomplete;