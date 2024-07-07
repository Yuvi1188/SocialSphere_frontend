import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { fetchSearchResults, clearSearchHistory } from '../../../store/search-action';
import { clearResults, addHistory } from '../../../store/search-slice'; // Import addHistory

const SearchSideBar = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { results, loading, error, history } = useSelector(state => state.search);

    useEffect(() => {
        if (query.trim()) {
            dispatch(fetchSearchResults(query));
        } else {
            dispatch(clearResults());
        }
    }, [query, dispatch]);

    const handleClearHistory = () => {
        dispatch(clearSearchHistory());
    };

    const handleUserClick = (user) => {
        dispatch(addHistory({ search: user }));
        onClose();
    };

    const handleHistoryClick = (id) => {
        navigate(`/profile/${id}`);
        onClose();
    };

    return (
        <div className="w-[24rem] h-full fixed dark-background text-white shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Search</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    &times;
                </button>
            </div>
            <div className="relative mb-4">
                <BsSearch className="absolute top-2 left-2 text-gray-400" size={20} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-md pl-8 pr-2 py-2 text-white focus:outline-none"
                    placeholder="Search"
                    style={{ backgroundColor: "#262626" }}
                />
            </div>
            {query.trim() ? (
                <div className="mt-4">
                    <h3 className="text-md font-semibold">Results</h3>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    <ul className="mt-2">
                        {results.map(result => (
                            <li key={result._id} className="py-2 border-b border-gray-800">
                                <Link to={`/profile/${result._id}`} className="flex items-center space-x-2" onClick={() => handleUserClick(result)}>
                                    <img src={result.userImgUrl.url} alt={result.username} className="w-8 h-8 rounded-full inline-block mr-2" />
                                    <span>{result.fullName} ({result.username})</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="mt-4">
                    <div className='flex flex-row justify-between items-center'>
                        <h3 className="text-md font-semibold">Recent Searches</h3>
                        <button onClick={handleClearHistory} className="mt-2 text-sm text-red-500">Clear History</button>
                    </div>
                    <ul className="mt-2">
                        {history.map((historyItem, index) => (
                            <li key={index} className="py-2 border-b border-gray-800">
                                <Link to={`/profile/${historyItem._id}`} className="flex items-center space-x-2" onClick={() => handleHistoryClick(historyItem._id)}>
                                    <img src={historyItem.userImgUrl.url} alt={historyItem.username} className="w-8 h-8 rounded-full inline-block mr-2" />
                                    <div className='flex flex-col'>
                                        <span>{historyItem.username}</span>
                                        <span className='text-xs text-gray-400'>{historyItem.fullName}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchSideBar;
