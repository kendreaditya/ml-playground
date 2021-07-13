import React, { useEffect, useState } from "react";

const Dropdown = ({label, param}) => {
  return (
    <>
      <p>{label}</p>
      <select>
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


const Parameters = ({parameters}) => {
  const [modelType, setModelType] = useState()
  const [modelParams, setModelParams] = useState()
  var models = {"types": [modelType]};
  
  useEffect(async ()=>{
    models = JSON.parse(await parameters); 
    setModelType(() => {
      const type = models.types[0]
      setModelParams(renderParameters(models.params[type].params))
      return type
    })
    console.log(models)
  }, []);

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

  return (<>
    <div className="container parameter" style={{ "background": "#FFFFFF" }}>
      <Dropdown label={"Model Type"} param={{"option": models.types}}/>
      {modelParams}
    </div>
  </>)
}

export default Parameters;