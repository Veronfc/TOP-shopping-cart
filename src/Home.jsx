/** @format */

import { Link } from "react-router-dom"

function Home() {
	return (
		<>
			<h1>this is the home page</h1>
      <Link to='/store'>link to store</Link>
		</>
	)
}

export default Home
