/** @format */

import { useEffect, useState, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'

function Library() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const [genres, setGenres] = useState([])
	const [platforms, setPlatforms] = useState([])
	const [options, setOptions] = useState({
		search: '',
		platform: '',
		genre: '',
		ordering: '',
		page: 1,
	})

	const [showOptions, setShowOptions] = useState(false)

	const { items, add, remove, clear, total } = useOutletContext()

	useEffect(() => {
		fetchGenres()
		fetchPlatforms()
	}, [])

	useEffect(() => {
		console.log(options)
	}, [options])

	useEffect(() => {
		fetchData()
	}, [options])

	//DESC: fetch api data
	const fetchGenres = async () => {
		try {
			const response = await fetch(
				'https://api.rawg.io/api/genres?key=e4b3b65720e64371972c8b9c24d94d4f',
				{
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-Type': 'application/json' },
				},
			)
			const data = await response.json()
			setGenres(data.results)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchPlatforms = async () => {
		try {
			const response = await fetch(
				'https://api.rawg.io/api/platforms/lists/parents?key=e4b3b65720e64371972c8b9c24d94d4f&page_size=8',
				{
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-Type': 'application/json' },
				},
			)
			const data = await response.json()
			setPlatforms(data.results)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchData = async () => {
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=e4b3b65720e64371972c8b9c24d94d4f&search=${options.search}&search_precise=true${options.platform === '' ? '' : `&parent_platforms=${options.platform}`}${options.genre === '' ? '' : `&genres=${options.genre}`}&ordering=${options.ordering}&page=${options.page}&page_size=40`,
				{
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-Type': 'application/json' },
				},
			)

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const data = await response.json()
			setData(data.results)
			setLoading(false)
		} catch (error) {
			setError('error.message')
			setLoading(false)
		}
	}

	//TODO: add card components to test cart logic

	function Card({ game }) {
		return (
			<article
				key={game.id}
				className='relative flex min-h-64 w-full cursor-pointer items-center justify-between overflow-hidden rounded-bl-3xl rounded-tl-3xl bg-c1 font-fin tracking-widest text-white duration-300 hover:w-[calc(100%+2rem)] hover:rounded-none'>
				<img
					src={game.background_image}
					className='image-fade h-full min-w-[60%] object-cover'></img>
				<p className='absolute bottom-0 w-3/5 p-4 text-5xl'>{game.name}</p>
				<section className='absolute right-0 h-full min-w-[35%] p-4'>
					<button
						onClick={() => {
							add({ id: game.id, name: game.name, price: 1250.0 })
						}}>
						{items.some(item => item.id === game.id)
							? 'In shopping cart'
							: 'Add to cart'}
					</button>
				</section>
			</article>
		)
	}

	return (
		<main className='relative mb-12 mt-20 flex h-[calc(100vh-8rem)] w-screen flex-col items-center justify-start gap-4 overflow-y-auto overflow-x-hidden bg-c2 p-4'>
			<section className='fixed grid gap-4 content-start left-0 top-20 z-10 rounded-br-3xl bg-c1 p-4 font-fin shadow-[-1rem_-1rem_2rem_1rem_black] duration-500' style={
					showOptions
						? { transform: 'translate(0, 0)' }
						: { transform: 'translate(-100%, 0)' }
				}>
				<div className='relative grid'>
				<p className='text-4xl justify-self-center text-ct'>Options</p>
				<button className='absolute text-ct bg-c1 w-12 h-16 -top-4 -right-16 rounded-br-3xl text-3xl' title='View options' onClick={() => {showOptions ? setShowOptions(false) : setShowOptions(true)}}>&#x2B7E;</button>
				</div>
				{/* //TODO: move search to header
				<div>
					<label htmlFor='search' className='text-xl text-ct'>
						Search
					</label>
					<input
						type='search'
						name='search'
						onInput={e => {
							setOptions({ ...options, search: e.target.value })
						}}
						className='rounded bg-c2 px-2 py-1'></input>
				</div> */}
				<div>
					<label htmlFor='ordering' className='text-xl text-ct pr-4'>
						Sort
					</label>
					<select
						name='ordering'
						defaultValue=''
						onInput={e => {
							setOptions({ ...options, ordering: e.target.value })
						}}
						className='cursor-pointer rounded bg-c2 px-2 py-1'>
						<option value=''>Default</option>
						<option value='name'>Name</option>
						<option value='released'>Release date</option>
					</select>
				</div>
				<div>
					<label htmlFor='platform' className='text-xl text-ct pr-4'>
						Platform
					</label>
					<select
						name='platform'
						defaultValue=''
						onInput={e => {
							setOptions({ ...options, platform: e.target.value })
						}}
						className='cursor-pointer rounded bg-c2 px-2 py-1'>
						<option value=''>Default</option>
						{platforms.map(platform => (
							<option value={platform.id}>{platform.name}</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor='genre' className='text-xl text-ct pr-4'>
						Genre
					</label>
					<select
						name='genre'
						defaultValue=''
						onInput={e => {
							setOptions({ ...options, genre: e.target.value })
						}}
						className='cursor-pointer rounded bg-c2 px-2 py-1'>
						<option value=''>Default</option>
						{genres.map(genre => (
							<option value={genre.slug}>{genre.name}</option>
						))}
					</select>
				</div>
			</section>
			{loading ? (
				<p>loading...</p>
			) : error ? (
				<p>Error: {error}</p>
			) : (
				data.map(game => {
					return <Card game={game} />
				})
			)}
		</main>
	)
}

export default Library
