import React from "react";
import Select from "react-select";

const dropdown = (
  { field_name, input_type, options, placeholder, isMulti, customStyles },
  onFormChange,
  form_data,
  editable,
) => {
  // map to React-Select option format
  const mappedOptions = options.map(({ text, value }) => ({ label: text, value: value ? value : text }));
  const value = form_data[field_name];
  // React-Select wants {label, value} for value prop
  // have to find corresponding label for the chosen value to render properly
  const option = mappedOptions.find(el => el.value === value);
  const label = option ? option.label : '';
  return (
    <Select
      styles={customStyles}
      placeholder={placeholder}
      escapeClearsValue={true}
      isClearable={true}
      isSearchable={true}
      name={field_name}
      options={mappedOptions}
      value={{ label, value }}
      classNamePrefix='react-dropdown'
      isMulti={isMulti}
      isDisabled={!editable}
      onChange={
        (target) => {
          // React-Select handles event targets internally
          // shape currentTarget from their format
          let value;
          if (!target || Array.isArray(target)) value = '';
          else value = target.value;
          const currentTarget = {
            value,
            name: field_name,
            type: input_type,
          };

          return onFormChange({ currentTarget })
        }
      }
    />
  );
};

export default dropdown;