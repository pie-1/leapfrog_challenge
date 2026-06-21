import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';
import { Share2, X } from 'lucide-react';

const ShareButton = ({ title, image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = window.location.href;
  const shareTitle = title || 'Check out my coloring page on ColorMe! 🎨';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-lg hover:scale-105 transition"
      >
        <Share2 size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-14 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 border border-pastel-pink/30 z-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-700 text-sm">Share with</h4>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <FacebookShareButton url={shareUrl} quote={shareTitle}>
                <FacebookIcon size={44} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <TwitterIcon size={44} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={shareTitle}>
                <WhatsappIcon size={44} round />
              </WhatsappShareButton>
              <EmailShareButton url={shareUrl} subject="ColorMe Coloring Page" body={shareTitle}>
                <EmailIcon size={44} round />
              </EmailShareButton>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Link copied to clipboard!');
                }}
                className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-2xl hover:bg-gray-200 transition"
              >
                📋
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;