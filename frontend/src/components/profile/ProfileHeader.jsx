import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/common/Icon'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/cards/GlassCard'
import Input from '@/components/ui/Input'

export function ProfileHeader({
  student = {
    name: 'Alex Rivera',
    avatar: '',
    level: 12,
    xp: 2450,
    rank: 4,
    college: 'Stanford University • ABTalks Academy',
    github: 'alexrivera',
    linkedin: 'alexrivera',
    portfolio: 'alexrivera.dev',
    currentStreak: 14,
    joinedSince: 'Oct 2026',
    title: 'Code Alchemist',
  },
  onUpdateProfile,
}) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [formData, setFormData] = useState({
    name: student.name,
    college: student.college,
    github: student.github,
    linkedin: student.linkedin,
    portfolio: student.portfolio,
    bio: 'Full-stack React & Node.js Developer in ABTalks cohort.',
  })

  const handleSave = (e) => {
    e.preventDefault()
    onUpdateProfile?.(formData)
    setShowEditModal(false)
  }

  return (
    <GlassCard className="relative overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/30 p-6 sm:p-8 shadow-2xl">
      {/* Background ambient light */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Avatar & Profile Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative group">
            <Avatar
              src={student.avatar}
              alt={student.name}
              size="xl"
              className="ring-4 ring-amber-500/30 shadow-2xl group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {student.name}
              </h1>
              <Badge variant="warning" className="px-2.5 py-0.5 text-xs font-black uppercase tracking-wider">
                Lv. {student.level} • {student.title}
              </Badge>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Rank #{student.rank}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 flex items-center gap-2 font-medium">
              <Icon name="GraduationCap" size={16} className="text-amber-400 shrink-0" />
              <span>{student.college}</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-400 pt-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-extrabold">
                <Icon name="Flame" size={15} />
                <span>{student.currentStreak} Day Streak</span>
              </div>
              <span className="text-neutral-700">•</span>
              <div className="flex items-center gap-1.5">
                <Icon name="Zap" size={15} className="text-amber-400" />
                <span className="font-mono text-white font-bold">{student.xp.toLocaleString()} XP</span>
              </div>
              <span className="text-neutral-700">•</span>
              <div className="flex items-center gap-1 text-neutral-400">
                <Icon name="Calendar" size={14} />
                <span>Joined {student.joinedSince}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://github.com/${student.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition text-xs font-semibold"
              >
                <Icon name="Github" size={14} />
                <span>github.com/{student.github}</span>
              </a>

              <a
                href={`https://linkedin.com/in/${student.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition text-xs font-semibold"
              >
                <Icon name="Linkedin" size={14} />
                <span>linkedin.com/in/{student.linkedin}</span>
              </a>

              {student.portfolio && (
                <a
                  href={`https://${student.portfolio}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-amber-400 hover:text-amber-300 transition text-xs font-semibold"
                >
                  <Icon name="Globe" size={14} />
                  <span>{student.portfolio}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Edit Profile Action */}
        <div className="shrink-0 self-start md:self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEditModal(true)}
            className="font-bold flex items-center gap-2 hover:border-amber-500/50"
          >
            <Icon name="Edit3" size={16} />
            <span>Edit Profile</span>
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-4 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Icon name="UserCheck" size={18} className="text-amber-400" />
                  <span>Edit Public Developer Profile</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="University / College"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                />
                <Input
                  label="GitHub Username"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                />
                <Input
                  label="LinkedIn Handle"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
                <Input
                  label="Portfolio Link"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                />

                <div className="pt-3 flex justify-end gap-3 border-t border-neutral-800">
                  <Button variant="outline" size="sm" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Changes
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </GlassCard>
  )
}

export default ProfileHeader
