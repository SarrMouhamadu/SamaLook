import { motion } from 'motion/react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🇸🇳</span>
            <span className="text-2xl font-bold">SamaLook</span>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mx-auto rounded-full mb-6" />
          
          <p className="text-gray-400 mb-6">
            Mode & Style Sénégalais
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-3 mb-8"
        >
          <a href="tel:+221771234567" className="flex items-center justify-center gap-3 text-gray-400 hover:text-white transition-colors">
            <Phone className="w-5 h-5 text-green-500" />
            <span>+221 77 123 45 67</span>
          </a>
          <a href="mailto:contact@samalook.com" className="flex items-center justify-center gap-3 text-gray-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5 text-yellow-500" />
            <span>contact@samalook.com</span>
          </a>
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <MapPin className="w-5 h-5 text-red-500" />
            <span>Dakar, Sénégal</span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center pt-8 border-t border-gray-800"
        >
          <p className="text-gray-400 text-sm">
            © 2026 SamaLook - Tous droits réservés
          </p>
        </motion.div>
      </div>
    </footer>
  );
}