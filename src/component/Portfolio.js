import dosthgreat from '../asset/image/dosthgreat.jpg';
import { portfolioImage, portfolioVideo } from '../asset/data/portfolioData';

const PortfolioItem= ({data,type}) => {
	return (
		<div className="project-item">
			<div className={data.portrait==true? 'image-portrait':'image-landscape'} >	
				<a 
					href={data.url} 
					rel="noopener noreferrer" 
					target="_blank" >{data.title}	
					{type==='image'
						? <img src={data.source} alt={data.title} />
						: type==='video'
							? <video src={data.source} width={`75%`} height={`75%`} controls></video>
							: null
					}
				</a>
			</div>
		</div>
	)
}
const Portfolio= () => {
	
	return (
		<div className="portfolio">
			{portfolioVideo.map((item,index) => <PortfolioItem key={index.toString()} type="video" data={item} />)}
			{portfolioImage.map((item,index) => <PortfolioItem key={index.toString()} type="image" data={item} />)}
		</div>
	)
}
export default Portfolio
