import { Link } from 'react-router-dom'

// variant: primary | secondary | accent | ghost   size: md | lg | sm
export default function Button({ to, variant = 'primary', size = 'md', block, className = '', children, ...rest }) {
  const cls = `btn btn-${variant} btn-${size}${block ? ' btn-block' : ''} ${className}`.trim()
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  return <button type="button" className={cls} {...rest}>{children}</button>
}
