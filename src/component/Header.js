import foto from '../asset/Foto.jpg'
import ContactInfo from './ContactInfo';

const Header= ({activeTitle,handleNav}) => {
	
	return (
		<div className="header">
			<div className="title-container">
				<h4 
					className={activeTitle==0 ? "active" : "not-active"}
					onClick={() => handleNav(0)}>Home</h4>
				<h4 
					className={activeTitle==1 ? "active" : "not-active"}
					onClick={() => handleNav(1)}>About</h4>
				<h4 
					className={activeTitle==2 ? "active" : "not-active"}
					onClick={() => handleNav(2)}>Portfolio</h4>
			</div>
			<div className="image-container">
				<img src={foto} />
			</div>
			<div className="info-container">
				<ContactInfo />		
			</div>
		</div>
	)
}
export default Header