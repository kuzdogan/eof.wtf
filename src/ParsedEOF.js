import headerFormat from "./headerFormat";
import bodyFormat from "./bodyFormat";
import { EOFContainer } from "@ethereumjs/evm";
import { useState } from "react";

const TextArea = ({ value }) => {
  const [divideBytes, setDivideBytes] = useState(true);
  const arrayValue = Array.from(value);
  const hexValue = arrayValue.map((byte) => byte.toString(16).padStart(2, "0"));

  return (
    <div className="flex flex-col mt-4">
      <div className="mb-1 flex flex-row justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>Length: {value.length} bytes</span>
        </div>
        <div className="flex justify-end items-center gap-3 text-xs">
          <span className={`font-medium text-white ${!divideBytes && "opacity-50"}`}>Divide Bytes</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!divideBytes}
              onChange={() => setDivideBytes(!divideBytes)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-gray-700"></div>
          </label>
          <span className={`font-medium text-white ${divideBytes && "opacity-50"}`}>Merge Bytes</span>
        </div>
      </div>
      <textarea
        className="text-sm w-full min-h-24 bg-gray-800 font-mono p-2 rounded border border-gray-700"
        readOnly
        value={!divideBytes ? hexValue.join("") : hexValue.join(" ")}
      />
    </div>
  );
};

const EOFRow = ({ field, value }) => {
  // fields with dynamic values are passed in with a value
  const currentValue = value !== undefined ? value : field.defaultValue;

  // Convert array values to single value for display
  if (Array.isArray(currentValue)) {
    throw new Error(`Field:${field.name} cannot have an array value`);
  }

  // console.log(`${field.name}: ${currentValue}`);
  if (Array.isArray(field.defaultValue)) {
    const [min, max] = field.defaultValue;
    if (currentValue < min || currentValue > max) {
      throw new Error(`${field.name} must be between ${min} and ${max}`);
    }
  }
  return (
    <tr className="border-b border-gray-700">
      <td className="py-2 pr-6 text-gray-400 font-mono text-right whitespace-nowrap">{field.name}:</td>
      <td className="py-2 px-6 text-green-400 font-mono whitespace-nowrap">
        {typeof currentValue === "number"
          ? "0x" + currentValue.toString(16).padStart(field.length * 2, "0")
          : currentValue}
      </td>
      <td className="py-2 px-6 text-blue-400 font-mono whitespace-nowrap">{currentValue}</td>
      <td className="py-2 pl-6 text-gray-500">{field.description}</td>
    </tr>
  );
};

// Container identifier is used to identify the container in the tree view e.g. "1.2", "1.4.1"
const ParsedEOF = ({ parsedEOF, identifier = "0" }) => {
  // Array of background colors for different nesting levels
  const bgColors = [
    "bg-gray-800", // depth 0
    "bg-cyan-950", // depth 1
    "bg-sky-950", // depth 2
    "bg-blue-950", // depth 3
    "bg-indigo-950", // depth 4
    "bg-violet-950", // depth 5
    "bg-purple-950", // depth 6
    "bg-fuchsia-950", // depth 7
    "bg-pink-950", // depth 8
    "bg-rose-950", // depth 9
  ];

  // Get background color based on depth (cycle through colors if depth exceeds array length)
  const depth = identifier.split(".").length - 1;
  const bgColor = bgColors[depth % bgColors.length];

  console.log("parsedEOF with identifier", identifier, parsedEOF);

  return (
    <div className="mb-8">
      <pre className={`${bgColor} p-4 rounded-lg overflow-x-auto`}>
        <h1 className={`text-2xl font-semibold ${bgColor}`}>Container {identifier}</h1>
        <p className="text-xs text-gray-400">
          Length: {parsedEOF.header.buffer.length + parsedEOF.body.buffer.length} bytes
        </p>

        {/* ************************** */}
        {/* ********** Header ********** */}
        {/* ************************** */}
        <div className="mt-4 border border-gray-700 rounded-lg p-4 overflow-x-auto">
          <h1 className="text-xl font-semibold">Header</h1>
          <h2 className="mt-4">Raw Header</h2>
          <TextArea value={parsedEOF.header.buffer} />
          <h2 className="mt-4">Parsed Header</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 pr-6 text-gray-300 font-mono text-right">Field</th>
                <th className="py-3 px-6 text-gray-300 font-mono text-left">Hex</th>
                <th className="py-3 px-6 text-gray-300 font-mono text-left">Decimal</th>
                <th className="py-3 pl-6 text-gray-300 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {/* First 3 fields are constants */}
              <EOFRow field={headerFormat.magic} />
              <EOFRow field={headerFormat.version} />
              <EOFRow field={headerFormat.kind_types} />
              <EOFRow field={headerFormat.types_size} value={parsedEOF.header.typeSize} />
              <EOFRow field={headerFormat.kind_code} />
              <EOFRow field={headerFormat.num_code_sections} value={parsedEOF.header.codeSizes.length} />
              {parsedEOF.header.codeSizes.map((size, index) => (
                <EOFRow key={`codeSizes-${identifier}-${index}`} field={headerFormat.code_size} value={size} />
              ))}
              {/* Optional, containers */}
              {parsedEOF.header.containerSizes?.length > 0 && (
                <>
                  <EOFRow field={headerFormat.kind_container} />
                  <EOFRow field={headerFormat.num_container_sections} value={parsedEOF.header.containerSizes.length} />
                  {parsedEOF.header.containerSizes.map((size, index) => (
                    <EOFRow
                      key={`containerSizes-${identifier}-${index}`}
                      field={headerFormat.container_size}
                      value={size}
                    />
                  ))}
                </>
              )}
              <EOFRow field={headerFormat.kind_data} />
              <EOFRow field={headerFormat.data_size} value={parsedEOF.header.dataSize} />
              <EOFRow field={headerFormat.terminator} />
            </tbody>
          </table>
        </div>

        {/* ************************** */}
        {/* ********** Body ********** */}
        {/* ************************** */}
        <div className="mt-4 border border-gray-700 rounded-lg p-4 overflow-x-auto">
          <h1 className="text-xl font-semibold">Body</h1>
          <h2 className="mt-4">Raw Body</h2>
          <TextArea value={parsedEOF.body.buffer} />
          <h2 className="mt-4">Parsed Body</h2>

          {/* Types Sections */}
          <div className="ml-4">
            <h3 className="mt-2">Types Sections</h3>
            {parsedEOF.body.typeSections.map((section, index) => (
              <div
                className="mt-4 border border-gray-700 rounded-lg p-4 overflow-x-auto"
                key={"typedSection-" + identifier + "-" + index}
              >
                <h4 className="text-sm">Types Section {index + 1}</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 pr-6 text-gray-300 font-mono text-right">Field</th>
                      <th className="py-3 px-6 text-gray-300 font-mono text-left">Hex</th>
                      <th className="py-3 px-6 text-gray-300 font-mono text-left">Decimal</th>
                      <th className="py-3 pl-6 text-gray-300 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <EOFRow field={bodyFormat.inputs} value={section.inputs} />
                    <EOFRow field={bodyFormat.outputs} value={section.outputs} />
                    <tr className="text-red-500">
                      <td>maxStackHeight is wrong?</td>
                    </tr>
                    <EOFRow field={bodyFormat.max_stack_height} value={section.maxStackHeight} />
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* Code Sections */}
          <div className="ml-4">
            <h3 className="mt-8">Code Sections</h3>
            {parsedEOF.body.codeSections.map((codeSectionUint8Array, index) => (
              <div className="ml-4" key={"codeSection-" + identifier + "-" + index}>
                <h4 className="mt-2 text-sm">Code Section {index + 1}</h4>
                <div className="mt-2">
                  <TextArea value={codeSectionUint8Array} />
                </div>
              </div>
            ))}
          </div>

          {/* Container Sections */}
          <div className="ml-4">
            <h3 className="mt-8">Container Sections</h3>
            {parsedEOF.body.containerSections.length > 0 ? (
              parsedEOF.body.containerSections.map((eofSection, index) => {
                const bytes = Buffer.from(eofSection);
                const parsedEofSection = new EOFContainer(bytes);
                return (
                  <div className="ml-4" key={"containerSection-" + identifier + "-" + index}>
                    <div className="mt-2">
                      <ParsedEOF parsedEOF={parsedEofSection} identifier={identifier + "." + index} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mt-2">No containers</div>
            )}
          </div>

          {/* Data Section */}
          <div className="ml-4">
            <h3 className="mt-8">Data Section</h3>

            {parsedEOF.body.dataSection.length > 0 ? (
              <>
                <div className="mt-2">
                  <TextArea value={parsedEOF.body.dataSection} />
                </div>
              </>
            ) : (
              <div className="mt-2">No data section</div>
            )}
          </div>
        </div>
      </pre>
    </div>
  );
};

export default ParsedEOF;
