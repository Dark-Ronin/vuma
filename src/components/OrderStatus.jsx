import { ORDER_STEPS } from '../data/orders'

export default function OrderStatus({ current }) {
  return (
    <ol className="timeline">
      {ORDER_STEPS.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo'
        return (
          <li key={s.label} className={`tl-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
            <span className="tl-dot" aria-hidden="true">{state === 'done' ? '✓' : ''}</span>
            <div>
              <strong>{s.label}</strong>
              <span>{state === 'todo' ? 'Pendente' : s.text}</span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
