import { NavLink } from 'react-router-dom'
import logo from '../assets/vectors/logo.svg'
import type { Page } from '../types/page'

function Header({ page }: { page: Page }) {
	return (
		<header id="header" className="header">
			<div className="header__container container">
				<NavLink className="logo" to="/">
					<img src={logo} alt="Markus Domenegheti logo" />
					<div className="logo__texts">
						<p className="logo__name">Markus Domenegheti</p>
						<p className="logo__role">Web Designer</p>
					</div>
				</NavLink>
				<nav className="header__menu">
					<ul>
						<li>
							<NavLink
								aria-current={page === 'portfolio' ? 'page' : undefined}
								className={({ isActive }) => isActive ? 'is-active' : ''}
								to="/"
								end
							>
								Portfolio
							</NavLink>
						</li>
						<li>
							<NavLink
								aria-current={page === 'resume' ? 'page' : undefined}
								className={({ isActive }) => isActive ? 'is-active' : ''}
								to="/resume"
							>
								Resume
							</NavLink>
						</li>
						<li>
							<NavLink
								aria-current={page === 'writing' ? 'page' : undefined}
								className={({ isActive }) => isActive ? 'is-active' : ''}
								to="/writing"
							>
								Writing
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
