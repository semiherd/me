import LocationOnIcon from '@mui/icons-material/LocationOn';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import socialData from '../asset/data/socialData';

const contactData={
	name: 'Semih Erdogan',
	location: 'Istanbul, Türkiye',
	email: 'smherdogan@gmail.com',
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
				{socialData.map(i => 
					<a key={i.id} href={i.url} rel="noopener noreferrer" target="_blank" >	
						<img src={i.image} alt={i.id} />
					</a>
				)}		
			</div>
		</>
	)
}
export default ContactInfo