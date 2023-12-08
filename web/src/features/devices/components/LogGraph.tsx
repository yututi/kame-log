'use client'

import dynamic from 'next/dynamic'
import dayjs from 'dayjs'
import { range } from 'lodash-es'
import useFetch from '@/hooks/useFetch'
import { Log, LogResponse, MonitoringItem, Location } from '../types'
import { useMemo, useState } from 'react'
import Flex from '@/components/Flex'
import Button from '@/components/Button'
import commonStyle from '@/styles/common.module.scss'
import Checkbox from '@/components/Checkbox'
import Card from '@/components/Card'
import DateSelector from '@/components/DateSelector'
import Radio from '@/components/Radio'
import typograhy from '@/styles/typography.module.scss'
import ProgressCircle from '@/components/ProgressCircle'
import Backdrop from '@/components/Backdrop'

const LineGraph = dynamic(() => import('@/components/LineGraph'), {
  ssr: false,
})

const labels = range(0, 24)
  .map((h) => range(0, 6).map((m) => `${h}:${m}0`))
  .flat()

const allLocations: Location[] = ['baskingspot', 'shelter', 'room']

type Props = {
  initialItem?: MonitoringItem
}

export default function LogGraph({ initialItem = 'temperature' }: Props) {
  const [date, setDate] = useState(dayjs().hour(0).minute(0).second(0).millisecond(0))
  const { response: log, isLoading } = useFetch<LogResponse>(
    `/api/logs?${new URLSearchParams({
      date: date.format('YYYY-MM-DD'),
    })}`,
  )

  const [monitoringItem, setMonitoringItem] = useState<MonitoringItem>(initialItem)
  const [locations, setLocations] = useState<Location[]>(allLocations)

  const datasets = useMemo(
    () => composeDatasets(log, monitoringItem, locations),
    [locations, monitoringItem, log],
  )

  const createOnChange = (argLocation: Location) => (checked: boolean) => {
    if (checked) {
      setLocations([...locations, argLocation])
    } else {
      setLocations(locations.filter((location) => location !== argLocation))
    }
  }

  return (
    <>
      <div className={commonStyle.threeColumns}>
        <Card>
          <Card.Content>
            <Flex direction='column'>
              <h2 className={typograhy.subheading}>表示対象</h2>
              <label htmlFor='temperature'>
                <Radio
                  id='temperature'
                  name='item'
                  onChange={(checked) => {
                    if (checked) setMonitoringItem('temperature')
                  }}
                  checked={monitoringItem === 'temperature'}
                />
                温度
              </label>
              <label htmlFor='humidity'>
                <Radio
                  id='humidity'
                  name='item'
                  onChange={(checked) => {
                    if (checked) setMonitoringItem('humidity')
                  }}
                  checked={monitoringItem === 'humidity'}
                />
                湿度
              </label>
            </Flex>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Flex direction='column'>
              <label htmlFor='b'>
                <Checkbox
                  defaultChecked={locations.includes('baskingspot')}
                  onChange={createOnChange('baskingspot')}
                  id='b'
                />
                バスキングスポット
              </label>
              <label htmlFor='s'>
                <Checkbox
                  defaultChecked={locations.includes('shelter')}
                  onChange={createOnChange('shelter')}
                  id='s'
                />
                シェルター
              </label>
              <label htmlFor='c'>
                <Checkbox
                  defaultChecked={locations.includes('room')}
                  onChange={createOnChange('room')}
                  id='c'
                />
                ケージ外
              </label>
            </Flex>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <DateSelector initialDate={date} onChange={setDate} />
          </Card.Content>
        </Card>
      </div>
      <LineGraph datasets={datasets} labels={labels} isLoading={isLoading} />
    </>
  )
}

const composeDatasets = (
  log: LogResponse | null,
  item: MonitoringItem,
  locations: Location[],
) => {
  const options = {
    room: {
      label: '部屋',
      color: {
        light: 'gray',
        dark: 'gray',
      },
    },
    baskingspot: {
      label: 'バスキングスポット',
      color: {
        light: 'orange',
        dark: 'orange',
      },
    },
    shelter: {
      label: 'シェルター',
      color: {
        light: 'lightblue',
        dark: 'lightblue',
      },
    },
  }

  return locations.map((location) => ({
    label: options[location].label,
    records: toRecord(log?.[location] || [], item),
    borderColor: options[location].color,
  }))
}

const toRecord = (logs: Log[], field: 'temperature' | 'humidity') => {
  return logs.reduce<{ [key: string]: number }>((all, log) => {
    const value = log[field]
    if (value == null) return all
    const key = dayjs(log.at).format('H:mm')
    all[key] = value
    return all
  }, {})
}
