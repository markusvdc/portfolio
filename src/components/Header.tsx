import logo from '../assets/vectors/logo.svg'
import type { Page } from '../types/page'
import { routes } from '../utils/routes'

function Header({ page }: { page: Page }) {
	return (
		<header id="header" className="header">
			<div className="header__container container">
				<a className="logo" href={routes.portfolio}>
					<img src={logo} alt="Markus Domenegheti logo" />
					<div className="logo__texts">
						<span className="logo__name">Markus Domenegheti</span>
						<span className="logo__role">Web Designer</span>
					</div>
				</a>
				<nav className="header__menu">
					<ul>
						<li>
							<a
								aria-current={page === 'portfolio' ? 'page' : undefined}
								className={page === 'portfolio' ? 'is-active' : ''}
								href={routes.portfolio}
							>
								Portfolio
							</a>
						</li>
						<li>
							<a
								aria-current={page === 'resume' ? 'page' : undefined}
								className={page === 'resume' ? 'is-active' : ''}
								href={routes.resume}
							>
								Resume
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
