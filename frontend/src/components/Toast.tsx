import './Toast.css'

interface ToastProps {
  message: string
  visible: boolean
}

export default function Toast({ message, visible }: ToastProps) {
  return <div className={`cart-toast${visible ? ' show' : ''}`}>{message}</div>
}
