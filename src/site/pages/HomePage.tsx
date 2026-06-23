import banner from '../../assets/images/home/banner.webp'

function HomePage() {
	return (
		<main>
			<section className="home">
				<div className="home__container container">
					<div className="home__content">
						<h1>
							Tem um projeto em mente?
						</h1>
						<p>
							Desenvolvo sites e páginas de captura em WordPress com design moderno, alta performance e foco em resultados. Crio soluções personalizadas, responsivas e otimizadas para SEO, ajudando empresas e profissionais a fortalecer sua presença digital e transformar visitantes em clientes.
						</p>
						<a className="home__button" href="https://wa.me/5516991802172" target="_blank" rel="noopener noreferrer">
							Contato
						</a>
					</div>
				</div>
				<div className="home__cover">
					<img src={banner} alt="Código colorido em uma tela de computador" />
				</div>
			</section>
		</main>
	)
}

export default HomePage
