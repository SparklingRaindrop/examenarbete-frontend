import { ChangeEvent, KeyboardEvent, MouseEvent, useReducer, useRef } from 'react';
import { useDisclosure } from '../../../hooks';
import useOutsideDetector from '../../../hooks/useOutsideDetector';
import { Input } from '../Input';
import { SuggestionItem, SuggestionList, Wrapper } from './styled';

type AutocompleteState = {
    selectedIndex: number;
    filteredSuggestions: Array<string>;
    isShown: boolean;
}

type Props = {
    suggestions: string[];
    userInput: string;
    updateUserInput: (value: string) => void;
    isLocked: boolean;
    setIsLocked: (value: boolean) => void;
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
    const { suggestions, userInput, isLocked, updateUserInput, setIsLocked } = props;
    const [state, dispatch] = useReducer(reducer, initialValue);
    const { containerRef } = useOutsideDetector(() => dispatch({
        type: 'state_update',
        value: {
            isShown: false,
        }
    }));
    const suggestionRefs = useRef<HTMLElement[]>([]);
    suggestionRefs.current = [];
    console.log(isLocked)
    function addToRefs(element: any): void {
        if (element && !suggestionRefs.current.includes(element)) {
            suggestionRefs.current.push(element);
        }
    };

    function trackSelectedItem() {
        suggestionRefs.current[state.selectedIndex]
            .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
    }

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
        updateUserInput(event.currentTarget.innerText.toLowerCase());
        setIsLocked(true);
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
            setIsLocked(true);

        } else if (event.key === 'ArrowUp') {
            if (selectedIndex === 0) return;
            trackSelectedItem();
            dispatch({
                type: 'state_update',
                value: {
                    selectedIndex: selectedIndex - 1
                }
            });

        } else if (event.key === 'ArrowDown') {
            if (selectedIndex === filteredSuggestions.length - 1) return;
            trackSelectedItem();
            dispatch({
                type: 'state_update',
                value: {
                    selectedIndex: selectedIndex + 1
                }
            });
        }
    }

    const { filteredSuggestions, isShown } = state;
    return (
        <Wrapper
            ref={containerRef as React.RefObject<HTMLDivElement>}>
            <Input
                type='text'
                onChange={handleOnChange}
                onKeyDown={onKeyDown}
                value={userInput}
                disabled={isLocked}
                autoFocus
            />
            {
                isShown && (
                    <SuggestionList>
                        {
                            filteredSuggestions.length > 0 ? (
                                filteredSuggestions.map((suggestion, index) => {
                                    return (
                                        <SuggestionItem
                                            key={suggestion}
                                            isSelected={index === state.selectedIndex}
                                            onClick={onClick}
                                            ref={addToRefs}>
                                            {suggestion}
                                        </SuggestionItem>
                                    );
                                })
                            ) : (
                                <SuggestionItem>
                                    No item found.
                                </SuggestionItem>
                            )
                        }
                    </SuggestionList>
                )
            }
        </Wrapper>
    );
}
