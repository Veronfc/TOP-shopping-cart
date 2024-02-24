/** @format */

import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function App() {
	const [items, setItems] = useState([])

	const total = () => {
		function sum(total, item) {
			return total + item.price * item.quantity
		}

		return items.reduce(sum, 0)
	}

	const add = item => {
		setItems([...items, item])
	}

	const remove = id => {
		const temp = items
		let index = temp.findIndex(item => item.id == id)
		temp.splice(index, 1)
		setItems(items)
	}

	const clear = () => {
		setItems([])
	}

	return (
		<>
			<header className='absolute top-0 flex h-20 w-screen items-center justify-between bg-c1 px-6 tracking-widest text-ct shadow-[0_-1rem_2rem_1rem_black]'>
				<Link className='text-color-change font-dhd text-5xl' to='/'>
					operATion overLord
				</Link>
				<nav className='flex gap-4 font-pcl'>
					<div className='flex place-items-center'>
						<input className='-mr-8 h-8 rounded-lg bg-c1 px-2 text-c1 duration-300'></input>
						<button
							className='material-symbols-outlined text-color-change text-3xl'
							title='Search catalogue'>
							search
						</button>
					</div>
					<Link
						to='/library'
						className='material-symbols-outlined text-color-change text-3xl'
						title='View catalogue'>
						grid_view
					</Link>
					<button
						className='material-symbols-outlined text-color-change text-3xl'
						title='View shopping cart'>
						shopping_cart
					</button>
				</nav>
			</header>
			<Outlet context={{ items, add, remove, clear, total }}/>
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

export default App
