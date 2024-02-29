/** @format */

import moment from 'moment'
import { useEffect, useState, useRef } from 'react'

function Home() {
	const [slides, setSlides] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const scroll = useRef()

	const handleScroll = direction => {
		if (direction === 'right') {
			if (
				scroll.current.scrollLeft + scroll.current.scrollWidth * 0.1 >=
				scroll.current.scrollWidth
			) {
				scroll.current.scrollLeft = 0
			} else {
				scroll.current.scrollLeft += scroll.current.scrollWidth / 10
			}
		} else {
			scroll.current.scrollLeft -= scroll.current.scrollWidth / 10
		}
	}

	useEffect(() => {
		fetchSlides()
	}, [])

	const fetchSlides = async () => {
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=e4b3b65720e64371972c8b9c24d94d4f&ordering=-rating&dates=${moment().subtract(1, 'years').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}&page_size=11`,
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

			setSlides(
				data.results.map(game => {
					return { id: game.id, name: game.name, url: game.background_image }
				}),
			)
			setLoading(false)
		} catch (error) {
			setError('error.message')
			setLoading(false)
		}
	}

	return (
		<>
			<main className='mb-12 mt-20 flex h-[calc(100vh-8rem)] w-screen flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-c2'>
				<section className='relative min-h-[calc(100vh-8rem)] w-full'>
					<img
						src='https://www.pixelstalk.net/wp-content/uploads/2016/05/Free-hd-gaming-wallpapers.jpg'
						title='Image sourced from pixelstalk.net'
						className='h-[calc(100vh-8rem)] w-screen object-cover'></img>
					<p className='absolute left-0 top-0 z-50 m-12 mt-16 w-[calc((100vw-6rem)/2)] text-center font-fin text-6xl text-ct'>
						TOP GAMES
					</p>
					<section
						ref={scroll}
						className='absolute left-0 top-0 m-12 mt-36 flex h-[calc(100vh-20rem)] w-[calc((100vw-6rem)/2)] snap-x snap-mandatory justify-start overflow-x-auto scroll-smooth rounded-lg bg-c2'>
						<button
							className='material-symbols-outlined fixed left-0 top-[calc(100vh/2)] z-10 ml-16 rounded-lg bg-[rgba(50,50,50,.25)] p-2 pl-3 pr-1 text-ct duration-300 hover:bg-[rgba(50,50,50,1)]'
							onClick={() => handleScroll('left')}>
							arrow_back_ios
						</button>
						<button
							className='material-symbols-outlined fixed left-[calc((100vw/2)-3.5rem)] top-[calc(100vh/2)] z-10 rounded-lg bg-[rgba(50,50,50,.25)] p-2 text-ct duration-300 hover:bg-[rgba(50,50,50,1)]'
							onClick={() => handleScroll('right')}>
							arrow_forward_ios
						</button>
						{/* //TODO: Add auto scroll */}
						{loading ? (
							//TODO: Add loading animation
							<p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
								loading...
							</p>
						) : error ? (
							<p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
								Error: {error}
							</p>
						) : (
							slides.map(slide => {
								if (slide.id != 962674) {
									return (
										<div className='snap-star relative h-full min-w-[calc((100vw-6rem)/2)]'>
											<img
												className='h-full min-w-full object-cover'
												src={slide.url}></img>
											<p className='absolute bottom-10 left-1/2 w-full -translate-x-1/2 bg-[rgba(50,50,50,0.75)] py-2 text-center font-fin text-5xl text-ct'>
												{slide.name}
											</p>
										</div>
									)
								}
							})
						)}
					</section>
				</section>
			</main>
			<footer className='absolute bottom-0 flex h-12 w-screen items-center justify-between bg-c1 p-1 px-6 font-fin tracking-widest text-ct shadow-[0_1rem_2rem_1rem_black]'>
				<p>
					Developed by{' '}
					<a
						href='https://github.com/Veronfc'
						target='_blank'
						className='text-color-change font-dhd text-3xl'>
						veronfc
					</a>
				</p>
				<p>
					Integrating the{' '}
					<a
						href='https://rawg.io/'
						target='_blank'
						className='text-color-change font-dhd text-3xl'>
						RAWG
					</a>{' '}
					API
				</p>
			</footer>
		</>
	)
}

export default Home
