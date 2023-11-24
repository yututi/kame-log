import Container from "@/components/Container"
import LogGraph from "@/features/devices/components/LogGraph"

export const revalidate = 60 * 10

export default function Home() {
  return (
    <Container>
      <LogGraph />
    </Container>
  )
}
