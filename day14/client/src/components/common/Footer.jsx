import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FiActivity } from "react-icons/fi";

const socialLinks = [
  { icon: FaFacebook, label: "Facebook", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];

const linkGroups = [
  {
    title: "Company",
    links: [
      { label: "Home", to: "/" },
      { label: "Find Services", to: "/providers" },
      { label: "About Us", to: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#14251A] text-white font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-9 h-9 rounded-xl bg-[#E8A33D] flex items-center justify-center shrink-0">
                <FiActivity className="w-5 h-5 text-[#14251A]" />
              </div>

              <span className="text-xl font-semibold tracking-tight font-['Space_Grotesk']">
                Service<span className="text-[#F3B85E]">Pulse</span>
              </span>
            </Link>

            <p className="text-white/55 text-sm mt-4 max-w-xs leading-relaxed">
              Connecting you with verified plumbers, electricians, cleaners, and
              more — booked in minutes.
            </p>

            <div className="flex gap-2 mt-6">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-[#14251A] hover:bg-[#E8A33D] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-sm text-white font-['Space_Grotesk'] mb-4">
                {group.title}
              </h4>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/55 hover:text-[#F3B85E] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-sm text-white font-['Space_Grotesk'] mb-4">
              Get in touch
            </h4>

            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <a
                  href="mailto:support@servicepulse.com"
                  className="flex items-center gap-2.5 hover:text-[#F3B85E] transition-colors"
                >
                  <MdEmail size={16} />
                  support@servicepulse.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+97714445678"
                  className="flex items-center gap-2.5 hover:text-[#F3B85E] transition-colors"
                >
                  <FaPhone size={14} />
                  +977-1-444-5678
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">
            © 2026 ServicePulse. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-white/40 font-['IBM_Plex_Mono']">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#3C8558] opacity-75 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#3C8558]" />
            </span>
            ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;