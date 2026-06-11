import { Link } from "react-router-dom";
import { User, ExternalLink, Globe, Video, AtSign } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">

        {/* Profile Image */}
        <div className="mb-10">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center border-4 border-white/20 overflow-hidden">
            <User size={60} className="text-white" />
          </div>
        </div>

        {/* Name & Bio */}
        <h1 className="text-5xl font-bold mb-3">Alex Rivera</h1>
        <p className="text-zinc-400 mb-8">@alexcodes • Full Stack Developer</p>

        <p className="text-zinc-300 mb-12 leading-relaxed">
          I build beautiful digital experiences. Currently learning and sharing my journey.
        </p>

        {/* Links */}
        <div className="space-y-4">
          {[
            { title: "Portfolio", icon: Globe, url: "#" },
            { title: "YouTube", icon: Video, url: "#" },        // Changed from Youtube to Video
            { title: "Contact", icon: AtSign, url: "#" },
          ].map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl py-5 px-6 flex items-center justify-between hover:scale-[1.02] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-zinc-300" />
                  <span className="font-medium">{link.title}</span>
                </div>
                <ExternalLink className="opacity-40 group-hover:opacity-100 transition" />
              </a>
            );
          })}
        </div>

        {/* Login Link */}
        <Link
          to="/login"
          className="mt-12 inline-block text-sm text-zinc-400 hover:text-white underline"
        >
          Login to Dashboard →
        </Link>

      </div>
    </div>
  );
};

export default HomePage;