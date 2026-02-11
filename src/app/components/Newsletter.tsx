import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-400/80 via-amber-300/80 to-lime-400/80 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Restez Connecté
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Recevez nos offres exclusives
          </p>

          {/* Newsletter Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <input
              type="email"
              placeholder="Votre email"
              className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-8 py-4 bg-white text-orange-600 rounded-full font-bold shadow-xl"
            >
              S'inscrire
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}