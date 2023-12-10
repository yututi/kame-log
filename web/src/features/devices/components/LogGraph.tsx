'use client'

import dynamic from 'next/dynamic'
import dayjs from 'dayjs'
import { range } from 'lodash-es'
import useFetch from '@/hooks/useFetch'
import { Log, LogResponse, MonitoringItem, Location } from '../types'
import { useMemo, useState } from 'react'
import commonStyle from '@/styles/common.module.scss'
import Card from '@/components/Card'
import DateSelector from '@/components/DateSelector'
import typograhy from '@/styles/typography.module.scss'
import useDate from '@/hooks/useDate'
import RadioGroup from '@/components/RadioGroup'
import CheckboxGroup from '@/components/CheckboxGroup'

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
  const [date, setDate] = useDate(dayjs().hour(0).minute(0).second(0).millisecond(0))
  const { response: log, isLoading } = useFetch<LogResponse>(
    date &&
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

  return (
    <>
      <div className={commonStyle.threeColumns}>
        <Card>
          <Card.Content>
            <h2 className={typograhy.subheading}>表示対象</h2>
            <RadioGroup
              name='item'
              values={[
                {
                  label: '温度',
                  value: 'temperature',
                },
                {
                  label: '湿度',
                  value: 'humidity',
                },
              ]}
              checked={monitoringItem}
              onChange={setMonitoringItem}
            />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <CheckboxGroup
              values={[
                {
                  label: 'バスキングスポット',
                  value: 'baskingspot',
                },
                {
                  label: 'シェルター',
                  value: 'shelter',
                },
                {
                  label: 'ケージ外',
                  value: 'room',
                },
              ]}
              checkedValues={locations}
              onChange={setLocations}
            />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <DateSelector date={date} onChange={setDate} />
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
