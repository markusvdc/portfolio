import logo from '../assets/vectors/logo.svg'
import { routes } from '../utils/routes'

function Footer() {
	return (
		<footer id="footer" className="footer">
			<div className="footer__container container">
				<div className="footer__social">
					<a href="https://github.com/markusvdc/" target="_blank" rel="noopener noreferrer">GitHub</a>
					<a href="https://www.linkedin.com/in/markusvdc/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
					<a href="https://www.behance.net/markusvdc/" target="_blank" rel="noopener noreferrer">Behance</a>
					<a href="https://pinterest.com/markusvdc/" target="_blank" rel="noopener noreferrer">Pinterest</a>
				</div>
				<div className="footer__info">
					<a className="logo" href={routes.portfolio}>
						<img src={logo} alt="Markus Domenegheti logo" />
						<div className="logo__texts">
							<span className="logo__name">Markus Domenegheti</span>
							<span className="logo__role">Web Designer</span>
						</div>
					</a>
					<div className="footer__description">
						<p>Developed in VS Code / Designed in Figma</p>
						<p>Phone: <a href="https://wa.me/5516991802172" target="_blank" rel="noopener noreferrer">+55 (16) 99180-2172</a></p>
						<p>Email: <a href="mailto:markusvdc@gmail.com">markusvdc@gmail.com</a></p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
