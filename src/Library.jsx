/** @format */

import { useEffect, useState, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'

function Library() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const { items, add, remove, clear, total} = useOutletContext()

	useEffect(() => {
		fetchData()
	}, [])

  //DESC: fetch api data
	const fetchData = async () => {
		try {
			const response = await fetch(
				'https://api.rawg.io/api/games?key=e4b3b65720e64371972c8b9c24d94d4f&page_size=20',
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
				className='relative flex min-h-80 w-full cursor-pointer items-center justify-between rounded-bl-3xl rounded-tl-3xl bg-c1 font-fin tracking-widest text-white duration-300'>
				<img
					src={game.background_image}
					className='image-fade h-full min-w-[60%] rounded-bl-xl rounded-tl-xl object-cover'></img>
				<p className='absolute bottom-0 p-4 text-5xl w-3/5'>{game.name}</p>
				<section className='absolute right-0 z-10 h-full min-w-[35%] p-4'>
					<button
						onClick={() => {
							add(game)
						}}>
						Add to cart
					</button>
				</section>
			</article>
		)
	}

	return (
		<main className='mb-12 mt-20 flex h-[calc(100vh-8rem)] w-screen flex-col items-center justify-start gap-2 overflow-y-auto bg-c2 p-4 font-pcl'>
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
