import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { GraduationCap, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white mt-16 rounded-t-3xl shadow-2xl">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              to="/home"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <GraduationCap className="h-8 w-8 mr-2 text-blue-600" />
              <span className="font-bold text-xl text-blue-600 hidden md:block">
                LEARN.COM
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering learners worldwide with world-class education and
              cutting-edge skills.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Browse Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Become an Instructor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Career Opportunities
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-purple-300" />
                support@learn.com
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-purple-300" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-purple-300" />
                123 Education Street, CA
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <TwitterLogoIcon className="h-6 w-6" />
              </a>

              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <InstagramLogoIcon className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} LEARN.COM. All rights reserved.
            <span className="block md:inline mt-2 md:mt-0">
              Terms of Service | Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
