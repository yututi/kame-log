import { Dayjs } from 'dayjs'
import Flex from '../Flex'
import Button from '../Button'
import { useState } from 'react'
import styles from './style.module.scss'
import typography from '@/styles/typography.module.scss'

type Props = {
  initialDate: Dayjs
  onChange?: (date: Dayjs) => void
}

export default function DateSelector({ initialDate, onChange }: Props) {
  const [date, setDate] = useState(initialDate)

  const createOnChangeDate = (delta: number) => () => {
    const newValue = date.date(date.date() + delta)
    setDate(newValue)
    onChange?.(newValue)
  }

  return (
    <div>
      <Flex justify='space-between'>
        <Button onClick={createOnChangeDate(-1)}>Prev</Button>
        <Button onClick={createOnChangeDate(1)}>Next</Button>
      </Flex>
      <div className={`${styles.dateLabel} ${typography.heading}`}>
        {date.format('YYYY/MM/DD')}
      </div>
    </div>
  )
}
