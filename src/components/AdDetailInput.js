import React from 'react';

const TextInput = ({type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className="block border border-grey-light w-full p-3 rounded mb-4"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
