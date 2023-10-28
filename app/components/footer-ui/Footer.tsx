import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { BiLogoTiktok } from "react-icons/bi";
import { Michroma } from "next/font/google";
import {
  AiFillInstagram,
  AiFillRedditCircle,
  AiFillFacebook,
  AiFillYoutube,
} from "react-icons/ai";

const footer = "bg-rose-700 text-slate-100 text-sm mt-16";
const hoverIcon =
  " rounded-lg  p-3 ease-in-out duration-300 bg-white backdrop-blur-md bg-white bg-opacity-20   hover:bg-stone-900 hover:backdrop-blur-md hover:bg-opacity-20 trasition ease-in-out duration-150";
const aboutUs = "flex flex-col md:flex-row justify-between pt-16 pd-8";
const sectionTitle = "text-base font-semibold ";

const michroma = Michroma({ subsets: ["latin"], weight: ["400"] });

const Footer = () => {
  return (
    <footer className={footer}>
      <Container>
        <div className={aboutUs}>
          <div className="w-full md:w-1/3  md:mb-0">
            <h3 className={`${michroma.className}  font-extrabold mb-2`}>
              T1er One
            </h3>
            <p className="mb-2">
              With a strong foundation in reliability and quality, Tier One is
              your go-to source for premium laptops, desktops, and other
              electronic devices. Shop with confidence and experience
              excellence.
            </p>
            <p className="text-xs">
              &copy;{new Date().getFullYear()} T1er One. All rights reserved
            </p>
          </div>
          <FooterList>
            <h3 className={sectionTitle}>Follow us!</h3>
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
            <h3 className={sectionTitle}>Contact us</h3>
            <Link href="">Customer service</Link>
            <Link href="">Terms & Conditions</Link>
            <Link href="">Email</Link>
            <Link href="">FAQ&apos;s</Link>
          </FooterList>
          <FooterList>
            <h3 className={sectionTitle}>Categories</h3>
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
