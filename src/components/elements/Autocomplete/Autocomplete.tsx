import { ChangeEvent, KeyboardEvent, MouseEvent, useReducer } from 'react';

type AutocompleteState = {
    selectedIndex: number;
    filteredSuggestions: Array<string>;
    isShown: boolean;
}

type Props = {
    suggestions: string[];
    userInput: string;
    updateUserInput: (value: string) => void;
}

const initialValue = {
    selectedIndex: 0,
    filteredSuggestions: [],
    isShown: false,
};

type Action = 'state_update';

function reducer(
    state: AutocompleteState,
    action: {
        type: Action,
        value: Partial<AutocompleteState>
    }): AutocompleteState {

    const { type } = action;
    if (type === 'state_update') {
        const { value } = action;
        return {
            ...state,
            ...value,
        };
    }
    return state;
}

export default function Autocomplete(props: Props) {
    const { suggestions, userInput, updateUserInput } = props;
    const [state, dispatch] = useReducer(reducer, initialValue);

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        );

        const inputValue = event.target.value;
        updateUserInput(inputValue);
        dispatch({
            type: 'state_update',
            value: {
                filteredSuggestions,
                isShown: inputValue === '' ? false : true,
            }
        });
    }

    function onClick(event: MouseEvent<HTMLElement>) {
        updateUserInput(event.currentTarget.innerText);
        dispatch({
            type: 'state_update',
            value: {
                filteredSuggestions: [],
                isShown: false,
            }
        });
    }

    function onKeyDown(event: KeyboardEvent) {
        const { selectedIndex, filteredSuggestions } = state;

        if (event.key === 'Enter') {
            updateUserInput(filteredSuggestions[selectedIndex]);
            dispatch({
                type: 'state_update',
                value: {
                    selectedIndex: 0,
                    isShown: false,
                }
            });

        } else if (event.key === 'ArrowUp') {
            dispatch({
                type: 'state_update',
                value: {
                    selectedIndex: selectedIndex - 1
                }
            });

        } else if (event.key === 'ArrowDown') {
            if (selectedIndex === filteredSuggestions.length - 1) return;

            dispatch({
                type: 'state_update',
                value: {
                    selectedIndex: selectedIndex + 1
                }
            });
        }
    }

    const suggestionItems = (
        state.filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === state.selectedIndex) {
                className = 'suggestion-active';
            }
            return (
                <li
                    key={suggestion}
                    style={{ border: `solid 1px ${index === state.selectedIndex ? 'tomato' : 'transparent'}` }}
                    onClick={onClick}>
                    {suggestion}
                </li>
            );
        })
    );

    return (
        <>

            <input
                type='text'
                onChange={handleOnChange}
                onKeyDown={onKeyDown}
                value={userInput}
            />
            {
                state.isShown &&
                (
                    <ul>
                        {state.filteredSuggestions.length > 0 ?
                            suggestionItems : (
                                <div>
                                    <em>No suggestions available.</em>
                                </div>
                            )}
                    </ul>
                )
            }
        </>
    );
}
