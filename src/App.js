import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
function App() {
	const [results, setResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState('react hooks');
	const [loading, setloading] = useState(false);
	const [error, setError] = useState(null);

	const searchRef = useRef();
	useEffect(() => {
		getResults();
	}, []);

	const getResults = async () => {
		setloading(true);

		try {
			const response = await axios.get(
				`http://hn.algolia.com/api/v1/search?query=${searchTerm}`
			);
			setResults(response.data.hits);
		} catch (err) {
			setError(err);
		}
		setloading(false);
	};
	const handleClearSearch = () => {
		setSearchTerm('');
		searchRef.current.focus();
	};
	return (
		<div className='container mx-w-md mx-auto p-4 m-2 bg-purple-lightest shawdow-lg rounded'>
			<h1 className='text-grey-darkest font-thin'>hacker news</h1>

			<input
				className='border p-1 rounded'
				type='text'
				placeholder='saerch'
				onChange={(event) => setSearchTerm(event.target.value)}
				value={searchTerm}
				ref={searchRef}
			/>

			<button
				type='submit'
				onClick={getResults}
				className='bg-green-500 rounded m-1 p-1 '>
				Search
			</button>
			<button
				type='button'
				onClick={handleClearSearch}
				className='bg-red-500 rounded m-1 p-1'>
				clear
			</button>

			{loading ? (
				<div>Loading results</div>
			) : (
				<ul>
					{results.map((result) => (
						<li key={result.objectID}>
							<a href={result.url}>{result.title}</a>
						</li>
					))}
				</ul>
			)}
			{error && <div>{error.message}</div>}
		</div>
	);
}

export default App;
