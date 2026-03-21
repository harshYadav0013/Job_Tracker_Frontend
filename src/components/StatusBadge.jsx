function StatusBadge({ status }) {
  return (
    <span className={`badge badge-${status}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  )
}

export default StatusBadge