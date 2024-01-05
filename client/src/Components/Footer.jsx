import React,{useEffect} from 'react'
// import './Footer.css'

// import Aos from 'aos'
// import 'aos/dist/aos.css'

const Footer = () => {

  // useEffect(()=>{
  //   Aos.init(
  //     {
  //       duration: 2000
  //     }
  //   )
  // },[])
  return (
    <div className="footer">
      <div className="footerContainer container">
        <div className="footerMenuDiv grid">

          {/*single grid 1*/}
          <div data-aos='fade-up' className="singleGrid">
            <span className="footerTitle">
              About
            </span>

            <ul className='footerUI grid'>
              <li className='footerLi'>
                How it works
              </li>

              <li className='footerLi'>
                Careers
              </li>

              <li className='footerLi'>
                Affliates
              </li>

              <li className='footerLi'>
                Media
              </li>
            </ul>
          </div>

           {/*single grid 2*/}
           <div data-aos='fade-up' className="singleGrid">
            <span className="footerTitle">
              Become Seller
            </span>

            <ul className='footerUI grid'>
              <li className='footerLi'>
                Add Vehicles
              </li>

              <li className='footerLi'>
                Resource center
              </li>

              <li className='footerLi'>
                Bonds
              </li>

              <li className='footerLi'>
                Release Dates
              </li>
            </ul>
          </div>

           {/*single grid3*/}
           <div data-aos='fade-up' className="singleGrid">
            <span className="footerTitle">
              Community
            </span>

            <ul className='footerUI grid'>
              <li className='footerLi'>
                Recommendations
              </li>

              <li className='footerLi'>
                Gift Card
              </li>

              <li className='footerLi'>
                Top Ups
              </li>

              <li className='footerLi'>
                Selling
              </li>
            </ul>
          </div>

           {/*single grid4*/}
           <div data-aos='fade-up' className="singleGrid">
            <span className="footerTitle">
              Booking
            </span>

            <ul className='footerUI grid'>
              <li className='footerLi'>
                Updates for Covid-19
              </li>

              <li className='footerLi'>
                Help center
              </li>

              <li className='footerLi'>
                Garages
              </li>

              <li className='footerLi'>
                Trust & Safety
              </li>
            </ul>
          </div>
        </div>

        {/*Footer Lower Section */ }
        <div className="lowerSection section">
          <p>2023 All right reserved</p>
          <blockquote>FYP Project</blockquote>
        </div>
      </div>
      </div>
    )
}

export default Footer;
