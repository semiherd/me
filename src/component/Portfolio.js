import { portfolioImage, portfolioVideo } from '../asset/data/portfolioData';

const PortfolioItem= ({data,type}) => {
	return (
		<div className="project-item">
			<h1>{data.title}</h1>
			<a 
				href={data.url} 
				rel="noopener noreferrer" 
				target="_blank" >
				{type==='image'
					? <img src={data.source} width={data.portrait ?`35%` :`90%`} height={data.portrait ?`90%` :`80%`} alt={data.title} />
					: type==='video'
						? <iframe class="responsive-iframe" src={data.source} width={data.portrait ?`25%` :`75%`} height={data.portrait ?`100%` :`100%`}></iframe>
						//? <video src={`https://drive.google.com/uc?export=view&id=1fVOHtZ6TTH2EwPuOM48G5bgBo9IyAd2_`} width={`75%`} height={`75%`} controls></video>
						: null
				}
			</a>
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
