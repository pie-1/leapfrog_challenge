import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Link as LinkIcon,
  LogOut,
  BarChart3,
  MousePointerClick,
  Layers,
  User,
  Sparkles,
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";

const Dashboard = () => {
  const { user, logout } = useAuthStore();

  const [links, setLinks] = useState([
    {
      id: 1,
      title: "Portfolio",
      url: "https://yourportfolio.com",
      clicks: 120,
    },
    {
      id: 2,
      title: "GitHub",
      url: "https://github.com",
      clicks: 240,
    },
    {
      id: 3,
      title: "YouTube",
      url: "https://youtube.com",
      clicks: 80,
    },
  ]);

  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
  });

  // =========================
  // STATS (MOCK ANALYTICS)
  // =========================

  const stats = useMemo(() => {
    const totalClicks = links.reduce(
      (acc, l) => acc + l.clicks,
      0
    );

    return {
      totalLinks: links.length,
      activeLinks: links.length,
      totalClicks,
    };
  }, [links]);

  // =========================
  // ADD LINK
  // =========================

  const addLink = () => {
    if (!newLink.title || !newLink.url) return;

    const link = {
      id: Date.now(),
      title: newLink.title,
      url: newLink.url,
      clicks: 0,
    };

    setLinks((prev) => [link, ...prev]);
    setNewLink({ title: "", url: "" });
  };

  // =========================
  // DELETE LINK
  // =========================

  const deleteLink = (id) => {
    setLinks((prev) =>
      prev.filter((l) => l.id !== id)
    );
  };

  return (
    <div className="min-h-screen container-custom py-10">
      {/* ================= HEADER ================= */}

      <div className="flex items-start justify-between mb-10">
        <div className="fade-up">
          <div className="badge mb-4">
            <Sparkles size={14} />
            Dashboard
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome back,{" "}
            {user?.name || "Alex"}
          </h1>

          <p className="text-zinc-500 mt-3">
            Manage your links, analytics and
            profile.
          </p>
        </div>

        <button
          onClick={logout}
          className="btn-secondary"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <div className="stat-card">
          <div className="flex items-center gap-2 text-zinc-400">
            <Layers size={16} />
            Total Links
          </div>
          <div className="stat-value">
            {stats.totalLinks}
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-2 text-zinc-400">
            <MousePointerClick size={16} />
            Total Clicks
          </div>
          <div className="stat-value">
            {stats.totalClicks}
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-2 text-zinc-400">
            <BarChart3 size={16} />
            Active Links
          </div>
          <div className="stat-value">
            {stats.activeLinks}
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ================= LEFT: ADD LINK ================= */}

        <div className="card p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-6">
            Add New Link
          </h2>

          <div className="space-y-4">
            <input
              className="input"
              placeholder="Link title"
              value={newLink.title}
              onChange={(e) =>
                setNewLink((p) => ({
                  ...p,
                  title: e.target.value,
                }))
              }
            />

            <input
              className="input"
              placeholder="https://example.com"
              value={newLink.url}
              onChange={(e) =>
                setNewLink((p) => ({
                  ...p,
                  url: e.target.value,
                }))
              }
            />

            <button
              onClick={addLink}
              className="btn-primary w-full"
            >
              <Plus size={18} />
              Add Link
            </button>
          </div>
        </div>

        {/* ================= RIGHT: LINKS ================= */}

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Your Links
            </h2>

            <span className="text-zinc-500 text-sm">
              {links.length} total
            </span>
          </div>

          {links.length === 0 && (
            <div className="card p-10 text-center text-zinc-500">
              No links yet. Add your first link.
            </div>
          )}

          {links.map((link) => (
            <div
              key={link.id}
              className="link-card p-5 flex items-center justify-between group"
            >
              {/* LEFT */}

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <LinkIcon size={16} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {link.title}
                  </h3>

                  <p className="text-sm text-zinc-500 truncate max-w-[300px]">
                    {link.url}
                  </p>
                </div>
              </div>

              {/* RIGHT ACTIONS */}

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="p-2 hover:bg-zinc-800 rounded-lg">
                  <Edit2 size={16} />
                </button>

                <button
                  onClick={() =>
                    deleteLink(link.id)
                  }
                  className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PROFILE SECTION ================= */}

      <div className="mt-12 card p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
            <User size={20} />
          </div>

          <div>
            <h3 className="font-semibold">
              {user?.name || "Alex Rivera"}
            </h3>
            <p className="text-zinc-500 text-sm">
              @{user?.username || "alexrivera"}
            </p>
          </div>
        </div>

        <button className="btn-secondary">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard;