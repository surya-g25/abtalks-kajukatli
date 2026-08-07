import Timeline from './Timeline'
import TimelineItem from './TimelineItem'

export function ChallengeTimeline({ checkpoints = [], currentDay = 1, className, ...props }) {
  return (
    <Timeline layout="horizontal" className={className} {...props}>
      {checkpoints.map((cp, idx) => {
        const isCompleted = cp.isCompleted || cp.day < currentDay
        const isActive = cp.day === currentDay
        const status = isCompleted ? 'completed' : isActive ? 'active' : 'pending'

        return (
          <TimelineItem
            key={idx}
            layout="horizontal"
            title={`Day ${cp.day}: ${cp.taskName}`}
            description={cp.xp ? `+${cp.xp} XP Reward` : undefined}
            status={status}
            iconName="Code"
          />
        )
      })}
    </Timeline>
  )
}

export default ChallengeTimeline
