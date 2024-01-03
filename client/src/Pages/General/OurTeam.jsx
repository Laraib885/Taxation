import React from 'react';
import { Email, Link, GitHub } from '@mui/icons-material';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function OurTeam() {
    return (
        <>
            <Header />
            <div className='Team'>
                <div className='team-heading'>
                    <h3>OUR TEAM MEMBERS</h3>
                    <h5>MEET OUR TEAM !</h5>
                </div>
                <div className='teamBoxes'>
                    <div className='firstRow'>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="user.avif" alt="" />
                            </div>
                            <h4>M Laraib Munam</h4>
                            <h6>Group Leader</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank' ><GitHub></GitHub></a></i>
                                <i><a target='_blank' ><Link></Link></a></i>
                                <i><a target='_blank' ><Email></Email></a></i>
                            </div>
                        </div>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="user.avif" alt="" />
                            </div>
                            <h4>M Umair Faiz</h4>
                            <h6>Assistant Group Leader</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank' ><GitHub></GitHub></a></i>
                                <i><a target='_blank' ><Link></Link></a></i>
                                <i><a target='_blank' ><Email></Email></a></i>
                            </div>
                        </div>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="user.avif" alt="" />
                            </div>
                            <h4>Muhammad Yasir</h4>
                            <h6>Group Member</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank' ><GitHub></GitHub></a></i>
                                <i><a target='_blank'><Link></Link></a></i>
                                <i><a target='_blank'><Email></Email></a></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default OurTeam;