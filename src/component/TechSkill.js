import techskillData from '../asset/data/techskillData';
import lovetolearn from '../asset/image/lovetolearn.jpg';
import codehappy from '../asset/image/codehappy.jpg';

const images= [lovetolearn,codehappy,lovetolearn,codehappy,lovetolearn]
const Skill= ({data}) => {
	return (
		<div className="skill-item">
			<h1>{data.text}</h1>
			<h1>{data.level}+</h1>
		</div>
	)
}

const SkillItem= ({title,index,data}) => {
	return(
		<div>
			<img src={images[index]} />
			<div>
				<h2>{title}</h2>
				<div className="skill-items">
					{data.map(item => <Skill key={item.text} data={item} />)}
				</div>
			</div>
		</div>
	)
}
const TechSkill= () => {
	
	const skillTitles=['Methodology','Data','Tech','Tool','Library']
	return (
		<div className="tech-skill">
			<img src={lovetolearn} />
			<div className="skill-group">
				{skillTitles.map((i,index) => <SkillItem key={i} index={index} title={i} data={techskillData[i.toLowerCase()]} />)}
			</div>
		</div>
	)
}
export default TechSkill