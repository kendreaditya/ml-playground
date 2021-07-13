import { BASE_URL } from '../consts';

const SOCKET_URL = `ws://${BASE_URL}/model/train/`;

// export const TrainWebsocket = (model_id) => {
//     return useWebSocket(SOCKET_URL+model_id, {share: true});
// }

export const trainWebsocket = (model_id) => {
    const ws = new WebSocket(SOCKET_URL+model_id)
    return ws
}