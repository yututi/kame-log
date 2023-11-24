"use client"

import useFetch from "@/hooks/useFetch"
import { Location, Log } from "../types"
import commonStyle from "@/styles/common.module.scss"
import { faDroplet, faTemperatureHalf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Flex from "@/components/Flex"

type Props = {
  location: Location
}
export default function DeviceStatus({ location }: Props) {

  const temp = useFetch<Log>(`/api/devices?location=${location}`)

  return (
    <>
      <Flex gap={6}>
        <FontAwesomeIcon style={{ fontSize: 20 }} className={commonStyle.icon} icon={faTemperatureHalf} />
        <span style={{ width: "40px", textAlign: "right" }}>{temp?.temperature || <Skeleton />}</span> ℃
      </Flex>
      <Flex gap={6}>
        <FontAwesomeIcon style={{ fontSize: 20 }} className={commonStyle.icon} icon={faDroplet} />
        <span style={{ width: "40px", textAlign: "right" }}>{temp?.humidity || <Skeleton />}</span> %
      </Flex>
    </>
  )
}

const Skeleton = () => {
  return (
    <div></div>
  )
}