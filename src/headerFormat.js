export const headerFormat = {
  magic: {
    name: "magic",
    length: 2,
    defaultValue: 0xef00,
    description: "EOF prefix",
  },
  version: {
    name: "version",
    length: 1,
    defaultValue: 0x01,
    description: "EOF version",
  },
  kind_types: {
    name: "kind_types",
    length: 1,
    defaultValue: 0x01,
    description: "kind marker for types size section",
  },
  types_size: {
    name: "types_size",
    length: 2,
    defaultValue: [0x0004, 0x1000], // min-max range
    description: "16-bit unsigned big-endian integer denoting the length of the type section content",
  },
  kind_code: {
    name: "kind_code",
    length: 1,
    defaultValue: 0x02,
    description: "kind marker for code size section",
  },
  num_code_sections: {
    name: "num_code_sections",
    length: 2,
    defaultValue: [0x0001, 0x0400], // min-max range
    description: "16-bit unsigned big-endian integer denoting the number of the code sections",
  },
  code_size: {
    name: "code_size",
    length: 2,
    defaultValue: [0x0001, 0xffff], // min-max range
    description: "16-bit unsigned big-endian integer denoting the length of the code section content",
  },
  kind_container: {
    name: "kind_container",
    length: 1,
    defaultValue: 0x03,
    description: "kind marker for container size section",
  },
  num_container_sections: {
    name: "num_container_sections",
    length: 2,
    defaultValue: [0x0001, 0x0100], // min-max range
    description: "16-bit unsigned big-endian integer denoting the number of the container sections",
  },
  container_size: {
    name: "container_size",
    length: 2,
    defaultValue: [0x0001, 0xffff], // min-max range
    description: "16-bit unsigned big-endian integer denoting the length of the container section content",
  },
  kind_data: {
    name: "kind_data",
    length: 1,
    defaultValue: 0x04,
    description: "kind marker for data size section",
  },
  data_size: {
    name: "data_size",
    length: 2,
    defaultValue: [0x0000, 0xffff], // min-max range
    description: "16-bit unsigned big-endian integer denoting the length of the data section content",
  },
  terminator: {
    name: "terminator",
    length: 1,
    defaultValue: 0x00,
    description: "marks the end of the header",
  },
};

export default headerFormat;
