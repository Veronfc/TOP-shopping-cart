/** @format */

import { useEffect, useState, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import moment from 'moment'

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

	const { items, add, remove, clear, total } = useOutletContext()

	useEffect(() => {
		fetchGenres()
		fetchPlatforms()
	}, [])

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

	function Card({ game }) {
		return (
			<article
				key={game.id}
				className='relative flex min-h-64 w-full items-center justify-between overflow-hidden rounded bg-c1 font-fin tracking-widest text-white duration-300 hover:scale-[1.01] hover:shadow-[.5rem_.5rem_1rem_.1rem_black]'>
				<img
					src={game.background_image}
					className='image-fade h-full max-w-[60%] object-cover'></img>
				<p className='absolute bottom-0 w-3/5 p-4 text-[2.5rem] leading-10'>
					{game.name}
				</p>
				<section className='absolute right-0 grid h-full min-w-[40%] grid-rows-[1fr_1rem_3rem_2rem] content-center justify-stretch p-4'>
					{/* //TODO: Add modal game details and screenshots */}
					<div></div>
					<p>Released: {moment(game.released, 'YYYY-MM-DD').format('DD MMM YYYY')}</p>
					<div className='flex items-center justify-start'>
						<p className='pt-1 pr-1'>Rating:</p>
					<Rating
						emptyColor='#b4b4b8'
						fillColor='#323232'
						initialValue={game.rating}
						size={20}
						iconsCount={5}
						SVGstorkeWidth={1}
						SVGstrokeColor='#b4b4b8'
						allowFraction
						readonly
					/>
					</div>
					<button
						onClick={() => {
							items.some(item => item.id === game.id)
							? remove(game.id)
							: add({ id: game.id, name: game.name, price: 1250.0 })
						}}
						className='duration-300 h-8 rounded bg-c2 text-xl text-c1 button-color-change'
						style={items.some(item => item.id === game.id) ? {backgroundColor: '#cc1100', color: '#b4b4b8'} : {}}>
						{items.some(item => item.id === game.id)
							? 'Remove from cart'
							: 'Add to cart'}
					</button>
				</section>
			</article>
		)
	}

	return (
		<div className='mb-12 mt-20 w-screen'>
			<input
				type='search'
				name='search'
				placeholder='Search...'
				onInput={e => {
					setOptions({ ...options, search: e.target.value })
				}}
				className='absolute right-40 top-6 z-20 w-32 rounded bg-c2 px-2 py-1 font-fin duration-500 placeholder:text-c1 focus:w-56'></input>
			<section className='flex h-12 w-screen items-center justify-center bg-c1 font-fin'>
				<div>
					<label htmlFor='ordering' className='pr-2 text-ct'>
						Order by
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
						<option value='rating'>Rating</option>
						<option value='metacritic'>Metacritic score</option>
					</select>
				</div>
				<div>
					<label htmlFor='platform' className='pl-8 pr-2 text-ct'>
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
					<label htmlFor='genre' className='pl-8 pr-2 text-ct'>
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
			<main className='relative grid h-[calc(100vh-11rem)] grid-cols-1 content-start justify-center gap-4 overflow-y-auto overflow-x-hidden bg-c2 p-4 lg:grid-cols-2 2xl:grid-cols-3'>
				{loading ? (
					//TODO: Add loading animation
					<p>loading...</p>
				) : error ? (
					<p>Error: {error}</p>
				) : (
					data.map(game => {
						return <Card game={game} />
					})
				)}
			</main>

			{/* TODO: Add pagination
			<section className='absolute bottom-0 left-1/2 z-20 flex h-12 -translate-x-1/2 items-center justify-center bg-c1 text-ct'>
				pagination
			</section> */}
		</div>
	)
}

export default Library
