import Overview from '../components/Overview'
import { portfolio } from '../data/portfolio'

function PortfolioPage() {
	return (
		<main>
			<h1 className="sr-only">Portfólio</h1>
			<Overview />
			<section className="portfolio">
				<div className="portfolio__container container">
					{portfolio.map((project) => (
						<div className="portfolio__item" key={project.description}>
							<div className="portfolio__cover">
								<img src={project.image} alt={project.alt} loading="lazy" />
							</div>
							<div className="portfolio__description">
								<p>{project.description}</p>
								{project.link && (
									<a className="button button--primary" href={project.link} target="_blank" rel="noopener noreferrer">Visitar Site</a>
								)}
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	)
}

export default PortfolioPage
