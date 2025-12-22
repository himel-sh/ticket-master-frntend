import { Link } from "react-router";
import { FaFacebook, FaStripe } from "react-icons/fa";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-6">
      {/* Main Footer Content */}
      <div className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Logo & Description */}
            <div>
              <h2 className="text-2xl font-bold text-lime-600 mb-4">
                TicketMaster
              </h2>
              <p className="text-sm text-gray-400">
                Book bus, train, launch & flight tickets easily
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-lime-600 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-lime-600 transition">
                    All Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-lime-600 transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="hover:text-lime-600 transition"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Contact Info
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:support@ticketmaster.com"
                    className="hover:text-lime-600 transition"
                  >
                    support@ticketmaster.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+15551234567"
                    className="hover:text-lime-600 transition"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-lime-600 transition flex items-center gap-2"
                  >
                    <FaFacebook /> Facebook Page
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Payment Methods
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded">
                  <FaStripe className="text-2xl text-blue-600" />
                </div>
                <span className="text-sm">Stripe</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <Container>
          <p className="text-sm text-center text-gray-400">
            © 2025 TicketMaster. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
