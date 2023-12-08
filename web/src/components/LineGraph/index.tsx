'use client'

import useTheme from '@/hooks/useTheme'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  ChartOptions,
} from 'chart.js'
import { use, useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import Backdrop from '../Backdrop'
import ProgressCircle from '../ProgressCircle'

Chart.register([
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
])

type LogRecords = { [key: string]: number }

type Props = {
  datasets: {
    label: string
    records: LogRecords
    borderColor: {
      light: string
      dark: string
    }
  }[]
  labels: string[]
  isLoading?: boolean
}
const options: ChartOptions = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 24,
      },
      grid: {
        color: 'dimgray',
      },
    },
    y: {
      ticks: {
        stepSize: 5,
      },
      grid: {
        color: 'dimgray',
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  animation: {
    duration: 0,
  },
}
export default function LineGraph({ datasets, labels, isLoading }: Props) {
  const ref = useRef(null)
  const theme = useTheme()
  const [chart, setChart] = useState<Chart | null>(null)
  const [initialLabels] = useState(labels)

  // init chartjs
  useEffect(() => {
    if (!ref.current) return
    const chart = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: initialLabels,
        datasets: [],
      },
      options,
    })
    setChart(chart)

    return () => {
      chart.destroy()
    }
  }, [initialLabels])

  // update chartjs
  useEffect(() => {
    if (!chart) return

    chart.data.labels = labels
    chart.data.datasets = datasets.map(({ records, ...others }) => ({
      label: others.label,
      borderColor: others.borderColor[theme],
      data: labels.map((time) => {
        const log = records[time]
        if (log) return log
        return null
      }),
    }))
    chart.update()
  }, [chart, datasets, labels, theme])

  return (
    <div className={styles.canvasWrapper}>
      <canvas ref={ref}></canvas>
      {isLoading && (
        <Backdrop absolute>
          <ProgressCircle />
        </Backdrop>
      )}
    </div>
  )
}
