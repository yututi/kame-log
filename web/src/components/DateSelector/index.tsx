import { Dayjs } from 'dayjs'
import Flex from '../Flex'
import Button from '../Button'
import { useState } from 'react'
import styles from './style.module.scss'
import typography from '@/styles/typography.module.scss'

type Props = {
  date?: Dayjs
  onChange?: (date: Dayjs) => void
}

export default function DateSelector({ date, onChange }: Props) {
  const createOnChangeDate = (delta: number) => () => {
    if (!date) return
    const newValue = date.date(date.date() + delta)
    onChange?.(newValue)
  }

  return (
    <div>
      <Flex justify='space-between'>
        <Button onClick={createOnChangeDate(-1)}>Prev</Button>
        <Button onClick={createOnChangeDate(1)}>Next</Button>
      </Flex>
      <div className={`${styles.dateLabel} ${typography.heading}`}>
        {date?.format('YYYY/MM/DD')}
      </div>
    </div>
  )
}
