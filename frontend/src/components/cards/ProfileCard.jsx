import GlassCard from './GlassCard'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'

export function ProfileCard({ name, role, bio, avatar, status = 'online', className }) {
  return (
    <GlassCard className={`text-center ${className}`}>
      <div className="flex flex-col items-center">
        <Avatar src={avatar} alt={name} size="xl" status={status} />
        <h4 className="mt-3 text-lg font-bold text-white">{name}</h4>
        {role && (
          <Badge variant="gradient" className="mt-1">
            {role}
          </Badge>
        )}
        {bio && <p className="mt-3 text-xs text-neutral-400 max-w-xs leading-relaxed">{bio}</p>}
      </div>
    </GlassCard>
  )
}

export default ProfileCard
