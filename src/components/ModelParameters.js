import React, { useState } from "react";
import { models } from "../consts";

const Dropdown = ({label, param, onChange=()=>{}}) => {
  return (
    <>
      <p>{label}</p>
      <select onChange={onChange}>
        {param.option.map((option) => <option value={option}>{option}</option>)}
      </select>
    </>
  )
}

const Input = ({label, param}) => {
    return (
      <>
        <p>{label}</p>
        <input type="number" min={param.option.min} max={param.option.max}/>
      </>
    )
}

const renderParameters = (params) => {
  return Object.keys(params).map((key) => {
    const param = params[key]
    if(Array.isArray(param.option)) {
      return <Dropdown label={key} param={param}/>
    }
    else {
      return <Input label={key} param={param}/>
    }
  })
}

const Parameters = () => {
  const [modelType, setModelType] = useState(models.types[0])


  return (<>
    <div className="container parameter" style={{ "background": "#FFFFFF" }}>
      <Dropdown label={"Model Type"} param={{"option": models.types}} value={modelType} onChange={(event)=>setModelType(event.target.value)}/>
      {renderParameters(models.params[modelType].params)}
    </div>
  </>)
}

export default Parameters;