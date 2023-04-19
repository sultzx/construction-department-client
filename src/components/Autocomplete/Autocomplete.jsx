import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import React from "react";

export const Authcomplete = ({isLoaded,onSelect}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        init,
        clearSuggestions,
    } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {

        clearSuggestions();
    });

    const handleInput = (e) => {

        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
            () => {
                console.log(description)

                setValue(description, false);
                clearSuggestions();


                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    onSelect( { description,  lat, lng })
                    console.log("📍 Coordinates: ", { lat, lng });
                });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

        React.useEffect(() => {
            if (isLoaded) {
                init()
            }
        }, [isLoaded, init])
    return (<div ref={ref}>
        <input  
        className="form-control firstname-input"      
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Қай жер?"  /> {status === "OK" && <dl className="suggestions">{renderSuggestions()}</dl>}</div>
    )
}
