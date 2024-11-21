export const bodyFormat = {
  types_section: {
    name: "types_section",
    length: "variable",
    defaultValue: "n/a",
    description: "stores code section metadata",
  },
  inputs: {
    name: "inputs",
    length: 1,
    defaultValue: [0x00, 0x7f], // min-max range
    description: "number of stack elements the code section consumes",
  },
  outputs: {
    name: "outputs",
    length: 1,
    defaultValue: [0x00, 0x80], // min-max range
    description: "number of stack elements the code section returns or 0x80 for non-returning functions",
  },
  max_stack_height: {
    name: "max_stack_height",
    length: 2,
    defaultValue: [0x0000, 0x03ff], // min-max range
    description: "maximum number of elements ever placed onto the stack by the code section, incl. inputs",
  },
  code_section: {
    name: "code_section",
    length: "variable",
    defaultValue: "n/a",
    description: "arbitrary sequence of bytes",
  },
  container_section: {
    name: "container_section",
    length: "variable",
    defaultValue: "n/a",
    description: "arbitrary sequence of bytes",
  },
  data_section: {
    name: "data_section",
    length: "variable",
    defaultValue: "n/a",
    description: "arbitrary sequence of bytes",
  },
};

export default bodyFormat;
