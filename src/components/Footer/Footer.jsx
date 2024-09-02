import React from "react";
import './Footer.scss';
import zomato from '../../utils/images/zomato.png';
import { FaLinkedin } from "react-icons/fa";
import { TbBrandGithub } from 'react-icons/tb';
import { BsTwitter } from "react-icons/bs";
import { TfiFacebook } from "react-icons/tfi";

const Footer = () => {
  return <div className="footer-container">
    <div className="footer">
      <a href="/"><img id="logo" src={zomato} alt="zomato" /></a>
      <div className="copyright">
        2023 © Zomato Clone™<br />
        created by <a href="https://www.linkedin.com/in/priyojeet-maity-055975192/" id="creator">Priyojeet</a>
      </div>
      <div className="social-media">
        <a href='https://www.linkedin.com/in/priyojeet-maity-055975192/' target='_blank'><FaLinkedin/></a>
        <a href='https://github.com/PriyajitMaity' target='_blank'><TbBrandGithub/></a>
        <a href="" target='_blank'><BsTwitter/></a>
        <a href="" target='_blank'><TfiFacebook/></a>
      </div>
    </div>
  </div>;
};

export default Footer;
