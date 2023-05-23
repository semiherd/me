import React from 'react';
import twitter from '../asset/image/twitter.png';
import instagram from '../asset/image/instagram.png';
import linkedin from '../asset/image/linkedin.png';
import github from '../asset/image/github.png';

const social=[twitter,instagram,linkedin,github]

const Footer= () => {
	return (
		<div className="footer">			
			<div>
				{social.map((i,index) => 
					<a key={index} data-testid={i} href={i} target="_blank" >	
						<img src={i} alt={i} />
					</a>
				)}			
			</div>
			<h2>2023</h2>
		</div>
	)
}
export default Footer

