import { overview } from '../data/overview'

function Overview() {
	return (
		<section className="overview">
			<div className="overview__container container">
				<div className="overview__texts">
					<p>{overview.text}</p>
				</div>
			</div>
		</section>
	)
}

export default Overview
