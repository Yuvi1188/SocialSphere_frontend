import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Suggestion from './Suggestion';
import { getSuggestions } from '../../store/suggestion-action';

const SuggestionList = () => {
    const dispatch = useDispatch();
    const { suggestions } = useSelector(state => state.suggestion);

    useEffect(() => {
        dispatch(getSuggestions());
    }, [dispatch]);

    return (
        <div className='p-20'>
            <p>Suggested for you</p>
            {suggestions.map((suggestion) => (
                <Suggestion key={suggestion.username} suggestion={suggestion} />
            ))}
        </div>
    );
}

export default SuggestionList;