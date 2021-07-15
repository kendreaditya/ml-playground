import React, { useState } from "react";
import { models } from "../consts";

const parseParam = {"string": String, "number": Number}

const Dropdown = ({className, label, param, onChange=()=>{}}) => {
  const paramType = parseParam[typeof(param.option[0])]
  if(param.param)
    onChange(param.option[0], param.param)
  return (
    <div className={className}>
      <p style={{marginBottom: "5px"}}>{label}</p>
      <select onChange={(event) =>onChange(paramType(event.target.value), param.param)} className="input-parameter">
        {param.option.map((option) => <option value={option}>{option}</option>)}
      </select>
    </div>
  )
}

const Input = ({className, label, param}) => {
    return (
      <div className={className}>
        <p>{label}</p>
        <input className="input-parameter" type="number" value={(param.option.min+param.option.max)/2} min={param.option.min} max={param.option.max}/>
      </div>
    )
}

const renderParameters = (params, onChange) => {
  return Object.keys(params).map((key) => {
    const param = params[key]
    if(Array.isArray(param.option)) {
      return <Dropdown className="parameter-col" label={key} param={param} onChange={onChange}/>
    }
    else {
      return <Input className="parameter-col" label={key} param={param} onChange={onChange}/>
    }
  })
}

const Parameters = ({onParameterChange}) => {
  const [modelType, setModelType] = useState(models.types[0])
  // JSON of parametners -> resets on modelType change
  // const [modelParameters, setModelParameters] = useState({})
  var modelParameters = {"model_type": models.params[modelType].param, "params": {}}; 

  const addModelParameters = (value, param) => {
    modelParameters.params[param] = value;
    onParameterChange(modelParameters)
  }

  React.useEffect(()=>onParameterChange(modelParameters), [modelParameters])

  return (<>
    <div className="container parameter" style={{ "background": "#FFFFFF" }}>
      <Dropdown label={"Model Type"} param={{"option": models.types}} value={modelType} onChange={(value, _)=>setModelType(value)}/>
      <div className="parameters">
        {renderParameters(models.params[modelType].params, addModelParameters)}
      </div>
    </div>
  </>)
}

export default Parameters;