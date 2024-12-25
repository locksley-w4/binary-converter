import { useEffect, useState } from 'react'
import './App.css'
import MyInput from './components/ui/MyInput/MyInput'
import CustomSelect from './components/ui/CustomSelect/CustomSelect'
import "./scripts/convert.js"
import { binToDec, decToBin } from './scripts/convert.js'

function App() {
  const [inputBase, setInputBase] = useState("bin")
  const [inputNum, setInputNum] = useState("")
  const [outputNum, setOutputNum] = useState("")
  const [outputBase, setOutputBase] = useState("dec")

  function convert() {
    let converted = null
    if (inputBase === outputBase) converted = inputNum;

    if (inputBase === "bin" && outputBase === "dec") converted = binToDec(inputNum);
    if (inputBase === "dec" && outputBase === "bin") converted = decToBin(inputNum);
    setOutputNum(converted)
  }

  function swapTypes() {
    setInputBase(outputBase)
    setOutputBase(inputBase)
    console.log(outputBase, inputBase);

  }

  function handleInputBaseChange(val) {
    setInputBase(val);
  }

  function handleOutputBaseChange(val) {
    setOutputBase(val);
  }
  function handleInput(ev) {
    setInputNum(ev.target.value);
  }

  return (
    <>
      <div className="convert-box" style={{ padding: "5% 0" }}>
        <h1>Binary Converter</h1>
        <CustomSelect style={{ marginTop: "0" }} value={inputBase} onChange={handleInputBaseChange}>
          <option id='binIn' value="bin">BIN (2)</option>
          <option id='decIn' value="dec">DEC (10)</option>
        </CustomSelect>
        <MyInput style={{}} onChange={handleInput} />
        <button onClick={swapTypes} style={{ margin: "15px 0" }} id="reverseTypes" className='reverseTypes'>
          <i className="fa fa-2x fa-refresh" color='aquamarine'></i>
        </button>
        <CustomSelect value={outputBase} onChange={handleOutputBaseChange}>
          <option id='decOut' value="dec">DEC (10)</option>
          <option id='binOut' value="bin">BIN (2)</option>
        </CustomSelect>
        <MyInput value={outputNum} disabled style={{}} />
        <button onClick={convert} style={{ marginTop: "5%" }}>Convert</button>
      </div>
    </>
  )
}

export default App
