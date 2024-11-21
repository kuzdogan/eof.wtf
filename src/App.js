import "./App.css";
import { EOFContainer } from "@ethereumjs/evm";
import bytecodes from "./bytecodes";
import { useState, useEffect } from "react";
import ParsedEOF from "./ParsedEOF";
import { FaGithub } from "react-icons/fa";
import EofLogo from "./images/eof_logo.png";

function App() {
  const [inputBytecode, setInputBytecode] = useState("");
  const [parsedEOF, setParsedEOF] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputBytecode) {
      try {
        const bytes = Buffer.from(inputBytecode.slice(2), "hex");
        const eof = new EOFContainer(bytes);
        setParsedEOF(eof);
        setError(null);
      } catch (error) {
        console.error("Error parsing bytecode:", error);
        setError("Error parsing bytecode:" + error);
      }
    }
  }, [inputBytecode]);

  const handleReset = () => {
    setInputBytecode("");
    setParsedEOF(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* ************************** */}
      {/* ********** Header ********** */}
      {/* ************************** */}
      <header className="bg-gray-800">
        <div className="container mx-auto px-32 py-3">
          <div className="flex justify-end">
            <a
              href="https://github.com/kuzdogan/eof.wtf"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </header>

      <div className="container px-4 max-w-5xl mx-auto py-4">
        {/* ************************** */}
        {/* ******* Description ******* */}
        {/* ************************** */}
        <div className="border-b border-gray-800">
          <div className="flex justify-center items-center my-2">
            <img src={EofLogo} alt="EOF Logo" className="w-80" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-4">EOF Parser and Visualizer</h1>
          <div className="mb-4">
            <p className=" text-gray-300 mb-4">
              This is an (unofficial) tool to parse and visualize EOF. EOF is the upcoming format for representing
              bytecode in Ethereum Virtual Machine (EVM).
            </p>
            <h2 className="text-lg font-semibold mb-2">Links:</h2>
            <ul className="list-disc list-inside text-lg underline">
              <li>
                <a href="https://evmobjectformat.org/" target="_blank" rel="noreferrer">
                  evmobjectformat.org
                </a>
              </li>
              <li>
                <a href="https://github.com/ipsilon/eof/blob/main/spec/eof.md" target="_blank" rel="noreferrer">
                  EOFv1 Spec
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ************************** */}
        {/* ********** Form ********** */}
        {/* ************************** */}
        <div className="mt-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Examples</h2>
            </div>
            <div className="flex gap-4 mb-4">
              {Object.entries(bytecodes).map(([key, { name, bytecode }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={(e) => {
                    setInputBytecode(bytecode);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold 
                         py-2 px-4 rounded-lg transition duration-200 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                         mr-2"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end items-center mb-2">
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-200 hover:bg-red-300 text-red-800 font-bold 
                         py-2 px-4 rounded-lg transition duration-200 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
            >
              Reset
            </button>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <textarea
            value={inputBytecode}
            onChange={(e) => setInputBytecode(e.target.value)}
            placeholder="Paste your bytecode here (starting with 0x...)"
            rows={5}
            className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       placeholder-gray-400"
          />
        </div>

        {/* ************************** */}
        {/* ********** Result ********** */}
        {/* ************************** */}
        <h1 className="text-2xl font-semibold my-2 text-center">Result</h1>
        {parsedEOF && <ParsedEOF parsedEOF={parsedEOF} />}
      </div>

      {/* ************************** */}
      {/* ********** Footer ********** */}
      {/* ************************** */}
      <footer className="bg-gray-800 mt-auto">
        <div className="container mx-auto px-32 py-2 flex flex-col justify-center items-center">
          <p className="text-gray-300 flex items-center text-lg">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/kuzdogan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 ml-2"
            >
              <FaGithub size={16} />
              kuzdogan
            </a>
          </p>
          <p className="text-gray-300 text-sm">
            EOF Parser:{" "}
            <a
              href="https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm"
              target="_blank"
              rel="noreferrer"
            >
              @ethereumjs/evm
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
