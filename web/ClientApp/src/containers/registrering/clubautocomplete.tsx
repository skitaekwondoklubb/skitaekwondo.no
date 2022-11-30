import { FormEvent, useEffect, useState } from "react";
import Autosuggest, { SuggestionsFetchRequested } from "react-autosuggest";
import { Club } from "../../services/clubService";

function escapeRegexCharacters(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

interface ClubAutocompleteProps {
    currentSelection: Club | undefined;
    clubs: Club[];
    setClub: (club: Club) => void;
}

function ClubAutocomplete(props: ClubAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<Club[]>([]);
    const [club, setClub] = useState(props.currentSelection?.name);

    useEffect(() => {
        const foundClub = props.clubs.find(x => x.name.toLowerCase() === club?.toLowerCase());
        if(foundClub != null) {
            props.setClub(foundClub);
        }
    }, [club])

    function getSuggestions(value: string) {
        const escapedValue = escapeRegexCharacters(value.trim());
  
        if (escapedValue === '') {
          return [];
        }
      
        return props.clubs.filter(club => club.name.toLowerCase().includes(escapedValue.toLowerCase()));
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
            getSuggestionValue={(aclub) => aclub.name}
            onSuggestionsFetchRequested={onSuggestionsFetch}
            renderSuggestion={(suggestion: Club) => (
                <div>
                    <span>{suggestion.name}</span>
                </div>
            )}
            inputProps={{
                value: club ?? "",
                onChange: setClubValue
            }}
        />
    )
}

export default ClubAutocomplete;