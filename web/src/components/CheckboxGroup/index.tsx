import Checkbox from '../Checkbox'
import Flex from '../Flex'
import Radio from '../Radio'

type Input<T extends string> = {
  value: T
  label: string
}
type Props<T extends string> = {
  values: Input<T>[]
  checkedValues: T[]
  onChange: (value: T[]) => void
}
export default function CheckboxGroup<T extends string>({
  values,
  checkedValues,
  onChange,
}: Props<T>) {
  return (
    <Flex direction='column'>
      {values.map((input) => (
        <label key={input.value} htmlFor={input.value}>
          <Checkbox
            id={input.value}
            checked={checkedValues.includes(input.value)}
            onChange={(checked) =>
              checked
                ? onChange([...checkedValues, input.value])
                : onChange(checkedValues.filter((value) => value !== input.value))
            }
          />
          {input.label}
        </label>
      ))}
    </Flex>
  )
}
