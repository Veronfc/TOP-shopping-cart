/** @format */

import { Link, Outlet } from 'react-router-dom'
import cart from './cart'

function App() {
	const current_cart = cart()

	return (
		<>
			<header className='header-bg flex h-20 items-center justify-between bg-c1 px-6 tracking-widest text-ct'>
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
						title='View shopping cart'
						onClick={() => {
							console.log(current_cart.items + ' ' + current_cart.total())
							current_cart.update('b2', 10)
							console.log(current_cart.items + ' ' + current_cart.total())
						}}>
						shopping_cart
					</button>
				</nav>
			</header>
			<Outlet />
			<footer className='absolute bottom-0 flex h-12 w-screen items-center justify-between bg-c1 px-4 font-pcl tracking-widest text-ct'>
				<p>
					Developed by{' '}
					<a
						href='https://github.com/Veronfc'
						target='_blank'
						className='text-color-change font-dhd text-3xl hover:underline'>
						veronfc
					</a>
				</p>
				<p>Add RAWG API attribution</p>
			</footer>
		</>
	)
}

export default App
