import Timeline from './Timeline'
import TimelineItem from './TimelineItem'

export function JourneyTimeline({ stages = [], className, ...props }) {
  return (
    <Timeline layout="vertical" className={className} {...props}>
      {stages.map((stage, idx) => (
        <TimelineItem
          key={idx}
          title={stage.title}
          description={stage.description}
          date={stage.date}
          status={stage.status}
          iconName={stage.iconName || 'Flag'}
        />
      ))}
    </Timeline>
  )
}

export default JourneyTimeline
