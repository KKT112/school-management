
import Left from './component/left'
import Right from './component/right-text'

const About = () => {
  return (
    <div 
    id='about-us'
    className='flex flex-col-reverse pt-20 sm:pt-30 xl:flex-row gap-15  md:mx-25 mx-5'>
    
      <Left/>
      <Right/>
      
    </div>
  )
}

export default About
