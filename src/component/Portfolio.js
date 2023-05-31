import dosthgreat from '../asset/image/dosthgreat.jpg';
import portfolioData from '../asset/data/portfolioData';

const PortfolioItem= ({data}) => {
	return (
		<div className="project-item">
			<div className={data.portrait==true? 'image-portrait':'image-landscape'} >	
				<a 
					href={data.url} 
					rel="noopener noreferrer" 
					target="_blank" >{data.title}	
					<img src={data.image} alt={data.title} />
				</a>
			</div>
		</div>
	)
}
const Portfolio= () => {
	
	return (
		<div className="portfolio">
			<img src={dosthgreat} alt="dosthgreat" />
			{portfolioData.map((item,index) => <PortfolioItem key={index.toString()} data={item} />)}
		</div>
	)
}
export default Portfolio