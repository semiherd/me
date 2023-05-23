import workanywhere from '../asset/image/workanywhere.jpg';

const keyRoles=[
	'Multi-disciplined competencies by combining both business skills and technical skills',
	'Experience on Leading Digitalization and Agile Software Development'
]
const profile='BS of Science on Industrial Engineering, with 10 years of experience on Digital Transformation, Data Analysis and Frontend Development.'
const AboutMe= () => {
	
	return (
		<div className="about-me">
			<div>
				<h4>ABOUT ME</h4>
				<h1>I am a data analyst & frontend developer with a passion for designing web and mobile apps. I like to develop simple and modern design approaches which <span>create values and resolves a pain point</span> on business processes for the end users.</h1>
				<h3>Profile</h3>
				<h1>{profile}</h1>
				<h3>Key Role</h3>
				{keyRoles.map((i,index) => <h2 key={index.toString()}>{i}</h2>)}
			</div>
			<img src={workanywhere} />
		</div>	
	)
}
export default AboutMe