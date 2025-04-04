import HomeContant from "./component/landing-home-contain";
import Navbar from "./navbar";

const LandingHomePage = () => {
  return (
    <div className="bg-[url(banner-bg.jpg)]  h-auto pb-5  ">
     <Navbar/>
     <HomeContant/>

    </div>
  )
}


export default LandingHomePage;
