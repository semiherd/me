import LocationOnIcon from '@mui/icons-material/LocationOn';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import twitter from '../asset/image/twitter.png';
import instagram from '../asset/image/instagram.png';
import linkedin from '../asset/image/linkedin.png';
import github from '../asset/image/github.png';

const social=[
	{
		id:'linkedin',
		image: linkedin,
		url:'https://www.linkedin.com/in/semih-e-b60a2a18/'
	},
	{
		id:'github',
		image: github,
		url:'https://github.com/semiherd'
	},
	{
		id:'instagram',
		image:instagram,
		url:'https://instagram.com/semiherdgan'
	},
	{
		id:'twitter',
		image:twitter,
		url:'https://twitter.com/semiherdogan'
	},
]

const contactData={
	name: 'Semih Erdogan',
	location: 'Istanbul, Turkiye',
	email: 'smherdogan@gmail.com',
	phone: '+90 5449203043'
}
const ContactInfo= () => {
	return (
		<>		
			<div>
				<LocationOnIcon sx={{alignSelf: 'center'}} color='primary' />
				<h1>{contactData.location}</h1>
			</div>
			<div>
				<AlternateEmailIcon sx={{alignSelf: 'center'}} color='primary' />
				<h1>{contactData.email}</h1>
			</div>									
			<div className="social-images">
				{social.map(i => 
					<a key={i.id} href={i.url} rel="noopener noreferrer" target="_blank" >	
						<img src={i.image} alt={i.id} />
					</a>
				)}		
			</div>
		</>
	)
}
export default ContactInfo