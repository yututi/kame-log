import Flex from '../Flex'
import Radio from '../Radio'

type Input<T extends string> = {
  value: T
  label: string
}
type Props<T extends string> = {
  values: Input<T>[]
  checked: T
  name: string
  onChange: (value: T) => void
}
export default function RadioGroup<T extends string>({
  values,
  name,
  checked,
  onChange,
}: Props<T>) {
  return (
    <Flex direction='column'>
      {values.map((input) => (
        <label key={input.value} htmlFor={input.value}>
          <Radio
            id={input.value}
            name={name}
            checked={checked === input.value}
            onChange={() => onChange(input.value)}
          />
          {input.label}
        </label>
      ))}
    </Flex>
  )
}
