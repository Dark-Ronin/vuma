// variant: deal | new | muted | ok | danger
export default function Badge({ variant = 'muted', children }) {
  return <span className={`badge badge-${variant}`}>{children}</span>
}
