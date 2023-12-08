import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './style.module.scss'
import { Theme } from '@/utils/theme'
import { useState } from 'react'
import commonStyles from '@/styles/common.module.scss'

type Props = {
  id?: string
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  theme?: Theme
}
export default function Checkbox({
  id,
  defaultChecked,
  onChange,
  theme = 'primary',
}: Props) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <span className={`${styles.wrapper}`}>
      <div className={`${styles.checkbox} ${styles[theme]} ${checked && styles.checked}`}>
        <FontAwesomeIcon
          className={styles.icon}
          style={{ opacity: checked ? 1 : 0 }}
          icon={faCheck}
        />
      </div>
      <input
        id={id}
        className={styles.input}
        type='checkbox'
        checked={checked}
        onChange={(e) => {
          const newValue = !checked
          setChecked(newValue)
          onChange?.(newValue)
        }}
      />
    </span>
  )
}
