import EmptyState from './EmptyState'

export function NoChallenges({ onAction, actionLabel = 'Find Challenges', ...props }) {
  return (
    <EmptyState
      title="No Active Challenges"
      description="You haven't joined any coding or business challenges yet. Pick a challenge to start building your skills!"
      iconName="Trophy"
      actionLabel={actionLabel}
      onAction={onAction}
      {...props}
    />
  )
}

export function NoStreak({ onAction, actionLabel = 'Claim Day 1', ...props }) {
  return (
    <EmptyState
      title="Streak Broken"
      description="Your streak is currently at 0. Solve a daily coding question or submit a task to fire up your streak!"
      iconName="Flame"
      actionLabel={actionLabel}
      onAction={onAction}
      {...props}
    />
  )
}

export function NoActivity({ onAction, actionLabel = 'Log Activity', ...props }) {
  return (
    <EmptyState
      title="No Activity Record"
      description="We couldn't find any recent commits, actions, or submissions. Get active to see your statistics grow!"
      iconName="Activity"
      actionLabel={actionLabel}
      onAction={onAction}
      {...props}
    />
  )
}

export function NoAchievements({ onAction, actionLabel = 'View Badges', ...props }) {
  return (
    <EmptyState
      title="No Achievements Yet"
      description="Achievements unlock when you complete major project goals, rank up, or hit consistency milestones."
      iconName="Award"
      actionLabel={actionLabel}
      onAction={onAction}
      {...props}
    />
  )
}

export function NoLeaderboard({ onAction, actionLabel = 'Join Leaderboard', ...props }) {
  return (
    <EmptyState
      title="Leaderboard Offline"
      description="No rank details are available right now. This can happen if the new tournament season hasn't started yet."
      iconName="Crown"
      actionLabel={actionLabel}
      onAction={onAction}
      {...props}
    />
  )
}

export function NoNotifications({ onAction, actionLabel = 'Go Home', ...props }) {
  return (
    <EmptyState
      title="All Caught Up!"
      description="You don't have any unread notifications or messages. We'll alert you when there are challenge updates."
      iconName="Bell"
      actionLabel={actionLabel}
      onAction={onAction}
      {...props}
    />
  )
}

export function NoData({ onAction, actionLabel = 'Reload Data', ...props }) {
  return (
    <EmptyState
      title="No Data Available"
      description="We couldn't load the records for this category. Check your internet connection or try again."
      iconName="Database"
      actionLabel={actionLabel}
      onAction={onAction}
      {...props}
    />
  )
}
