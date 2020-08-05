import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav>
			<h1>
				<Link to='/'>Villy's</Link>
			</h1>
			<ul className='nav-links'>
				<li>
					<Link to='/'>Home</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
