import Card from "@/components/Card"
import DateSelector from "@/components/DateSelector"
import RadioGroup from "@/components/RadioGroup"
import CheckboxGroup from "@/components/CheckboxGroup"
import commonStyle from "@/styles/common.module.scss"
import typograhy from "@/styles/typography.module.scss"
import { MonitoringItem, Location } from "../types"
import dayjs, { Dayjs } from "dayjs"
import { ReactNode, createContext } from "react"

type Props = {
  monitoringItem: MonitoringItem
  setMonitoringItem: (monitoringItem: MonitoringItem) => void
  locations: Location[]
  setLocations: (locations: Location[]) => void
  date: Dayjs
  setDate: (date: Dayjs) => void
}

export default function LogGraphController({
  monitoringItem,
  setMonitoringItem,
  locations,
  setLocations,
  date,
  setDate,
}: Props) {
  return (
    <div className={commonStyle.threeColumns}>
      <Card>
        <Card.Content>
          <h2 className={typograhy.subheading}>表示対象</h2>
          <RadioGroup
            name="item"
            values={[
              {
                label: "温度",
                value: "temperature",
              },
              {
                label: "湿度",
                value: "humidity",
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
                label: "バスキングスポット",
                value: "baskingspot",
              },
              {
                label: "シェルター",
                value: "shelter",
              },
              {
                label: "ケージ外",
                value: "room",
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
  )
}
