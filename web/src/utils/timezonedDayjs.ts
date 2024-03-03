import "server-only"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Tokyo")
// Vercelでデプロイする都合上、タイムゾーンがUTCになってしまうので、サーバ側ではこれを使ってtimezoneを指定する
export default dayjs
