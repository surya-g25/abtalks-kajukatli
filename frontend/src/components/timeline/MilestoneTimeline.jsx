import Timeline from './Timeline'
import TimelineItem from './TimelineItem'

export function MilestoneTimeline({ milestones = [], className, ...props }) {
  return (
    <Timeline layout="vertical" className={className} {...props}>
      {milestones.map((ms, idx) => (
        <TimelineItem
          key={idx}
          title={ms.title}
          description={
            ms.badgeEarned
              ? `Awarded "${ms.badgeEarned}" Badge${ms.xpReward ? ` • +${ms.xpReward} XP` : ''}`
              : ms.xpReward
              ? `+${ms.xpReward} XP Earned`
              : undefined
          }
          date={ms.date}
          status={ms.isReached ? 'completed' : 'pending'}
          iconName="Trophy"
        />
      ))}
    </Timeline>
  )
}

export default MilestoneTimeline
