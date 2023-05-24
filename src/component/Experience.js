import laptop from '../asset/image/laptop.jpg';
import experienceData from '../asset/data/experienceData';


const WorkItem= ({data}) => {
	return (
		<div className="work-item">
			<div>
				<div>
					<h2>{data.role}</h2>
				</div>
				<div>
					{data?.start && <h1>{data.start}</h1>}
					{data?.start &&<h1> - </h1>}
					{data?.end && <h1>{data.end}</h1>}
					{data?.start && !data?.end && <h1>Current</h1>}
				</div>
			</div>
			<div>
				<h2>{data.company}</h2>		
			</div>
			<div>
				{data.intro.map((item,index) => <h1 key={data.role+'_'+index.toString()}>{item}</h1>)}
			</div>
		</div>
	)
}
const Experience= () => {
	
	return (
		<div className="experience">
			<img src={laptop} alt="laptop" />
			{experienceData.map((item,index) => <WorkItem key={index.toString()} data={item} />)}
		</div>
	)
}
export default Experience