import './App.css'
import React,{useRef, useState,useEffect} from 'react'
import Header from './component/Header'
import Experience from './component/Experience'
import TechSkill from './component/TechSkill'
import Portfolio from './component/Portfolio'
import Footer from './component/Footer'
import AboutMe from './component/AboutMe'
import Home from './component/Home'
import arrowup from './asset/image/arrowup.png';

function App() {
  const colors={
    notSelectedBg: '#d3d3d3',
    notSelectedColor: '#760B39',
    selectedBg: '#34568B',
    selectedColor: '#f8f8ff'
  }
  const [arrowUpVisible,setArrowUpVisible]= useState(false)
  const animRef= useRef({
    aboutMe: false
  })
  const [scrollPosition, setScrollPosition] = useState(
    {x:0,y:0}
  )
  const [activeTitle,setActiveTitle]= useState(0)
  const portfolioRef= useRef()
  const experienceRef= useRef()
  const skillRef= useRef()
  const refArray=[portfolioRef,experienceRef,skillRef]
  const [titleState,setTitleState]= useState({
    skill:true,
    experience:false,
    portfolio:false,
  })
  
  function handleScroll(){
    const positionY = window.pageYOffset;
    const positionX = window.pageXOffset;
    setScrollPosition({
      x: positionX,y:positionY
    });
  };

  async function handleNav(item){
    try{
      setActiveTitle(item)
    }catch(e){
      console.log('handleNav error:',e)
    }
  }
  async function handleTitle(ref){
    try{
      let response={};
      const lowerCaseRef= ref.current.textContent.toLowerCase();
      await Promise.all(refArray.map( i => {  
        const lowerCaseItem= i.current.textContent.toLowerCase();
        response={
          ...response,
          [lowerCaseItem]:false
        }  
        i.current.style.backgroundColor = colors.notSelectedBg;
        i.current.style.color = colors.notSelectedColor;                     
      
        if(lowerCaseItem===lowerCaseRef){ 
          response={
            ...response,
            [lowerCaseItem]:true
          }
          ref.current.style.backgroundColor = colors.selectedBg;
          ref.current.style.color = colors.selectedColor;         
        }
      }))
      setTitleState(response);
    }catch(e){
      console.log(e)
    }
  }
  const handleMove = (i) => {
    window.scrollTo({ top: i, behavior: "smooth" });
    
  };

  useEffect(() => {
    console.log('activeTitle:',activeTitle);
    if(activeTitle===0){
      handleMove(0)
    }
    else if(activeTitle===1){
      handleMove(760)
    }if(activeTitle===2){
      handleMove(1600)
    }
  },[activeTitle])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 
  useEffect(() => {
    skillRef.current.style.backgroundColor = colors.selectedBg;
    skillRef.current.style.color = colors.selectedColor; 
  },[])

  useEffect(() => {
    console.log('scrollPosition',scrollPosition)
    if(scrollPosition.y<200) setArrowUpVisible(false)
    else setArrowUpVisible(true)

    if(scrollPosition.y>50 && scrollPosition.y<100){
      animRef.current.aboutMe= true
    }else if(scrollPosition.y>800){
      animRef.current.aboutMe= false
    }
    console.log('animRef',animRef.current.aboutMe)
  },[scrollPosition])

  return (
    <div className="App">
        <Header activeTitle={activeTitle} handleNav={handleNav} />
        <Home />
        {arrowUpVisible && <img alt="arrowup" onClick={() => handleMove(0)} className="arrow-up" src={arrowup} />}
        <div className={animRef.current.aboutMe? "animAboutMeIn":"animAboutMeOut"}>
          <AboutMe />
        </div>
        <div className="main-container">      
            <h3
              ref={skillRef}
              onClick={() => handleTitle(skillRef)}>Skill</h3>
            <h3 
              ref={experienceRef}
              onClick={() => handleTitle(experienceRef)}>Experience</h3>
            <h3 
              ref={portfolioRef}
              onClick={() => handleTitle(portfolioRef)}>Portfolio</h3>
        </div>     
        <div className="data-container">
            {titleState.experience===true && <Experience/>}
            {titleState.skill===true && <TechSkill />}
            {titleState.portfolio===true && <Portfolio />}
        </div>    
        <Footer />
    </div>
  );
}

export default App;
