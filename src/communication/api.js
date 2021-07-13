import { BASE_URL } from '../consts';

const POST_MODEL_URL = `http://${BASE_URL}/model/create/`;
const GET_MODEL_PARAMETERS = `http://${BASE_URL}/model/parameters/`;

export const createModel = ({model_type, x_train, y_train, x_test, y_test, params}) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify({
            model_type: model_type,
            x_train: x_train,
            y_train: y_train,
            x_test: x_test,
            y_test: y_test, 
            params: params, 
        });

    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
    };

    return fetch(POST_MODEL_URL, requestOptions).then(res => res.text())
}

export const modelParameters = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    return fetch(GET_MODEL_PARAMETERS, requestOptions).then(res => res.json())
}