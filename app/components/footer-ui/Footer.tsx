import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { BiLogoTiktok } from "react-icons/bi";
import {
  AiFillInstagram,
  AiFillRedditCircle,
  AiFillFacebook,
  AiFillYoutube,
} from "react-icons/ai";

const footer = "bg-[#111212] text-slate-100 text-sm mt-16"
const hoverIcon = "hover:px-2 ease-in-out duration-300" 
const aboutUs = "flex flex-col md:flex-row justify-between pt-16 pd-8"
const sectionTitle = "text-base font-semibold text-stone-500"

const Footer = () => {
  return (
    <footer className={footer}>
      <Container>
        <div className={aboutUs}>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className={sectionTitle}>About us</h3>
            <p className="mb-2">
              With a strong foundation in reliability and quality,
              <strong className="text-stone-400"> T1er One </strong> is your
              go-to source for premium laptops, desktops, and other electronic
              devices. Shop with confidence and experience excellence.
            </p>
            <p className="text-xs text-sky-400">
              &copy;{new Date().getFullYear()} T1er One. All rights reserved
            </p>
          </div>
          <FooterList>
            <h3 className={sectionTitle}>
              Follow us!
            </h3>
            <div className="flex gap-2">
              <Link href="" className={hoverIcon}>
                <AiFillFacebook size={24} />
              </Link>
              <Link href="" className={hoverIcon}>
                <AiFillInstagram size={24} />
              </Link>
              <Link href="" className={hoverIcon}>
                <AiFillRedditCircle size={24} />
              </Link>
              <Link href="" className={hoverIcon}>
                <BiLogoTiktok size={24} />
              </Link>
              <Link href="" className={hoverIcon}>
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
          <FooterList>
            <h3 className={sectionTitle}>
              Contact us
            </h3>
            <Link href="">Customer service</Link>
            <Link href="">Terms & Conditions</Link>
            <Link href="">Email</Link>
            <Link href="">FAQ&apos;s</Link>
          </FooterList>
          <FooterList>
            <h3 className={sectionTitle}>
              Categories
            </h3>
            <Link href="">Mobile phone</Link>
            <Link href="">Laptops</Link>
            <Link href="">Desktops</Link>
            <Link href="">Smart watch</Link>
            <Link href="">Smart tv&apos;s</Link>
            <Link href="">Accesories</Link>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
