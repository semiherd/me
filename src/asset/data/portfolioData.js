import hoc_searchbar from '../image/hoc_searchbar.png';
import project3 from '../image/project3.png';
import project4 from '../image/project4.png';
import project5 from '../image/project5.png';
import project8 from '../image/project8.png';
import portfoliovideo1 from '../video/portfolio1.mov';
import portfoliovideo2 from '../video/portfolio2.mov';
import portfoliovideo3 from '../video/portfolio3.mov';

const portfolioVideo=[
	{
		title: '3d-Animation with Three.Js',
		url: 'https://github.com/semiherd/3d-book-threejs',
		source: 'https://drive.google.com/file/d/1fVOHtZ6TTH2EwPuOM48G5bgBo9IyAd2_/view?usp=drive_link',
		portrait: false
	},
	{
		title: 'Hexagon Shaped Gallery',
		url: 'https://github.com/semiherd/hexagon-gallery-css',
		source: 'https://drive.google.com/file/d/1g90YwuunhyovD50UxmxKG_WiPcCGtYhI/view?usp=drive_link',
		portrait: false
	},
	{
		title: 'Scrollable Header - React Native',
		url: 'https://github.com/semiherd/scrollableheader',
		source: 'https://drive.google.com/file/d/1g90YwuunhyovD50UxmxKG_WiPcCGtYhI/view?usp=drive_link',
		portrait: true
	}
]

const portfolioImage=[
	{
		title: 'Animation on Scroll - ReactJs',
		url: 'https://semiherd.github.io/onscrollanimation/',
		source: project4,
		portrait: false
	},
	{
		title: 'Responsive Flight Search SPA - ReactJs',
		url: 'https://github.com/semiherd/eurowings_spa_reactjs/',
		source: project5,
		portrait: false
	},
	{
		title: 'Animated Sidebar - ReactJs',
		url: 'https://github.com/semiherd/reactjs_sidebar',
		source: project8,
		portrait: false
	},
	{
		title: 'Search Bar HOC - ReactJs & TS',
		url: 'https://codesandbox.io/s/hoc-search-bar-auto-complete-5h4cld',
		source: hoc_searchbar,
		portrait: false
	},
	{
		title: 'Auth Screen - ReactNative',
		url: 'https://github.com/semiherd/rn_authscreen',
		source: project3,
		portrait: true
	},
]
export {
	portfolioVideo,
	portfolioImage
}
