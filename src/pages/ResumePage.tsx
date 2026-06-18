import Overview from '../components/Overview'
import { resumeItems } from '../data/resume'

function ResumePage() {
	return (
		<main>
			<h1 className="sr-only">Resume</h1>
			<Overview />
			<div className="jobs">
				<div className="jobs__container container">
					{resumeItems.map((item) => (
						<div className="jobs__item" key={item.join('|')}>
							{item.map((line) => (
								<p key={line}>{line}</p>
							))}
						</div>
					))}
				</div>
			</div>
		</main>
	)
}

export default ResumePage
