
//import Hero from './hero-section/component/hero-contain';
import About from './about/about';
import Footer from './footer/footer';
import LandingHomePage from './school-landong-page-home/landing-home-page';
import Programs from './programs/programs';
import { LuArrowUp } from "react-icons/lu";
import StudentReview from './student-review/student-review';

const SchoolLandingPages = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
    <div>
      <LandingHomePage/>
      <About/>
      <Programs/>
      <StudentReview/>
      <Footer/>
    </div>
    <div>
      <button onClick={scrollToTop} className=' top-150 right-10 fixed text-white bg-orange-700  shadow-md p-3 rounded-3xl '><LuArrowUp /></button>
    </div>
    </div>
  )
}

export default SchoolLandingPages;
