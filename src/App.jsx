/** @format */

import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function App() {
	const [items, setItems] = useState([])
	const [cart, setCart] = useState(true)

	useEffect(() => {
		console.log(items)
	}, [items])

	const add = item => {
		if (!items.some(_item => _item.id === item.id)) {
			setItems([...items, item])
		}
	}

	const remove = id => {
		setItems(items.filter(item => item.id !== id))
	}

	const clear = () => {
		setItems([])
	}

	const total = () => {
		function sum(total, item) {
			return total + item.price
		}

		return items.reduce(sum, 0)
	}

	return (
		<>
			<header className='absolute top-0 z-20 flex h-20 w-screen items-center justify-between bg-c1 px-6 tracking-widest text-ct shadow-[0_-1rem_2rem_1rem_black]'>
				<Link className='text-color-change font-dhd text-5xl' to='/'>
					operATion overLord
				</Link>
				<nav className='font-pcl flex gap-4'>
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
						title='View shopping cart'
						onClick={() => {
							cart ? setCart(false) : setCart(true)
						}}>
						shopping_cart
					</button>
				</nav>
			</header>
			<section
				className='absolute right-0 top-20 z-10 grid max-h-[70%] min-h-min w-96 grid-rows-[1fr_3rem] overflow-hidden rounded-bl-3xl bg-c2 font-fin text-2xl shadow-[1rem_-1rem_2rem_1rem_black] duration-500'
				style={
					cart
						? { transform: 'translate(0, 0)' }
						: { transform: 'translate(0, -150%)' }
				}>
				<div className='flex flex-col gap-2 px-4 py-2 text-xl'>
					{items.map(item => {
						return (
							<div className='cart-text-color-change flex items-center justify-between duration-500'>
								<p>{item.name}</p>
								<button
									title='Remove from cart'
									onClick={() => remove(item.id)}>
									&#x2716;
								</button>
							</div>
						)
					})}
				</div>
				<div className='grid grid-cols-[1fr_5rem] items-center bg-c1 text-ct'>
					<p className='px-4'>R {total()}</p>
					<button
						title='Clear shopping cart'
						className='text-color-change'
						onClick={() => clear()}>
						Clear
					</button>
				</div>
			</section>
			<Outlet context={{ items, add, remove, clear, total }} />
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
