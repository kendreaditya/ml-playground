import React, { useState } from "react";
import LineGraph from './visualizations/LineGraph';
import ContourScatter from './visualizations/ContourScatter';
import TSNE from './visualizations/TSNE';
import { createModel } from "../communication/api";
import { trainWebsocket } from "../communication/websocket";
import { colors } from "../consts";
import { timeFormatDefaultLocale } from "d3";

function shuffle(obj1, obj2) {
  var index = obj1.length;
  var rnd, tmp1, tmp2;

  while (index) {
    rnd = Math.floor(Math.random() * index);
    index -= 1;
    tmp1 = obj1[index];
    tmp2 = obj2[index];
    obj1[index] = obj1[rnd];
    obj2[index] = obj2[rnd];
    obj1[rnd] = tmp1;
    obj2[rnd] = tmp2;
  }
}

const apiBody = (dataset, parameters, split) => {
    const y_test = [];
    const x_test = [];

    dataset.map((cluster, lbl) => {
        cluster.map((point) => {
            y_test.push(lbl)
            x_test.push([point.x, point.y])
        })
    })

    shuffle(y_test, x_test);

    const split_idx = parseInt(y_test.length*(split/100))
    parameters["y_train"] = y_test.splice(0, split_idx)
    parameters["y_test"] = y_test
    parameters["x_train"] = x_test.splice(0, split_idx)
    parameters["x_test"] = x_test

    return parameters
}

var dataset;

const ResultsPannel= ({getDataset, getParameters, getSplit}) => {
    const [loss, setLoss] = useState([])
    const [accuracy, setAccuracy] = useState([])
    const [TSNE_points, setTSNE_points] = useState({x: [[0,0]], y:[0]})
    const [meshgrid, setMeshgrid] = useState([])

    const trainModel = async () => {
        const body = apiBody(getDataset(), getParameters(), getSplit())
        dataset = JSON.parse(JSON.stringify(body))
        delete dataset["model_type"]
        delete dataset["params"]

        var model_id = await createModel(body)

        const ws = trainWebsocket(model_id)

        ws.onopen = () => {
            console.log('connected')
        }

        ws.onmessage = evt => {
            const data = JSON.parse(evt.data)
            setLoss(loss => {
                return [...loss, data.loss]
            })

            setAccuracy(accuracy => {
                return [...accuracy, data.accuracy]
            })

            setTSNE_points({x: data.tsne, y: body["y_train"]})

            setMeshgrid(data.heatmap)
        }
    }
    

    return (<>
            <button id="train-button" onClick={trainModel}>Train Me!</button>
            <LineGraph x={loss} color={colors[0]}/>
            <LineGraph x={accuracy} color={colors[0]} domain={[0, 1]}/>
            <ContourScatter points={dataset} meshgrid={meshgrid}/>
            <TSNE points={TSNE_points}/>
        </>
    )
}

export default ResultsPannel;
