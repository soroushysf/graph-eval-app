import axios from 'axios';

const GRAPH_DB_URL = 'http://localhost:3000/api/graphs/';
const GRAPH_POST_REQ = 'http://localhost:3000/api/graphs/submit-data';

export const FETCH_GRAPH = 'FETCH_GRAPH';
export const POST_GRAPH = 'POST_GRAPH';

export function fetchGraph (graphNumber) {
    const request = axios.get(GRAPH_DB_URL+graphNumber);
    return {
        type: FETCH_GRAPH,
        payload: request
    }
}

export function postEvaluation(evaluationData) {
    const request = axios.post(GRAPH_POST_REQ, evaluationData);

    return {
        type: POST_GRAPH,
        payload: request
    }
}