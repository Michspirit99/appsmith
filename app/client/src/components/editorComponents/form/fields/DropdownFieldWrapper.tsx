import React, { useEffect, useState } from "react";
import type { SelectOptionProps } from "design-system";
import { Select, Option } from "design-system";

function DropdownFieldWrapper(props: SelectOptionProps) {
  const selectedValueHandler = () => {
    if (
      props.input &&
      props.input.value &&
      Object.keys(props.input.value).length > 0
    ) {
      return props.input.value.value;
    } else if (props.input && typeof props.input.value === "string") {
      return props.input.value;
    } else if (props.placeholder) {
      return props.placeholder;
    }
  };
  const [selectedOption, setSelectedOption] = useState<any>({
    value: selectedValueHandler(),
  });
  const onSelectHandler = (value?: string) => {
    props.input.onChange({ value: value });
  };

  useEffect(() => {
    setSelectedOption({ value: selectedValueHandler() });
  }, [props.input.value, props.placeholder]);

  //  TODO: defaultValue doesn't seem to work. Something also seems to be off about the focus state and the way the trigger works.St
  return (
    <Select
      className={props.className}
      defaultValue={selectedOption.value}
      isDisabled={props.disabled}
      onSelect={onSelectHandler}
      options={props.options}
    >
      {props.options.map((option: SelectOptionProps) => {
        return <Option key={option.id}>{option.value}</Option>;
      })}
    </Select>
  );
}

export default DropdownFieldWrapper;
