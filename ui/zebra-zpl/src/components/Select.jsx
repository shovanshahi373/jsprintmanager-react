import React, { useEffect, useState } from "react";

import Select from "react-select";

const SelectComponent = ({
  extractor,
  options,
  handleChange,
  selected,
  label,
}) => {
  const [list, setList] = useState([]);
  const [item, setItem] = useState(null);

  useEffect(() => {
    setList(
      options.map((item) => {
        const { label, value } = extractor(item);
        return {
          label,
          value,
        };
      })
    );
  }, [options]);

  useEffect(() => {
    setItem(list.find((i) => i.value === selected) || null);
  }, [selected]);

  return (
    <>
      <Select
        styles={{
          container: (base) => ({
            ...base,
            width: "300px",
          }),
        }}
        options={list}
        onChange={handleChange}
        placeholder={label}
        value={item || null}
      />
    </>
  );
};

export default SelectComponent;
