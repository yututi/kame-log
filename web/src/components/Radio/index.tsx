import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './style.module.scss'
import { Theme } from '@/utils/theme'
type Props = {
  id?: string
  checked?: boolean
  name?: string
  onChange?: (checked: boolean) => void
  theme?: Theme
}
export default function Radio({ id, name, checked, onChange, theme = 'primary' }: Props) {
  return (
    <span className={`${styles.wrapper}`}>
      <div
        className={`${styles.radio} ${styles[theme]} ${checked && styles.checked}`}
      ></div>
      <input
        id={id}
        name={name}
        className={styles.input}
        type='radio'
        defaultChecked={checked}
        onChange={(e) => {
          const newValue = e.currentTarget.checked
          onChange?.(newValue)
        }}
      />
    </span>
  )
}
