import { overview } from '../data/overview'

function Overview() {
	return (
		<section className="overview">
			<div className="overview__container container">
				<div className="overview__texts">
					<h1>{overview.title}</h1><p>{overview.text}</p>
				</div>
			</div>
		</section>
	)
}

export default Overview
