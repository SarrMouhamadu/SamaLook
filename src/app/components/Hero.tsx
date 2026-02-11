import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with African Pattern Overlay */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1573325090598-27718bb05e53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5lZ2FsZXNlJTIwd29tYW4lMjBmYXNoaW9ufGVufDF8fHx8MTc3MDgzODExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Fashion Sénégalaise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/60 via-yellow-900/40 to-green-900/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <div className="text-6xl mb-4">🇸🇳</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            SamaLook
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mx-auto rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-white mb-8"
        >
          Mode & Style Sénégalais
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-white text-red-600 rounded-full font-bold text-lg shadow-2xl"
        >
          Découvrir
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-3xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}