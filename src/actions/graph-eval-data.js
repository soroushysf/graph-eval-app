/**
 * Created by soroush on 9/29/18.
 */

export const ADD_GRAPH_INFO = "ADD_GRAPH_INFO";

export const ADD_GRAPH_NAME = "ADD_GRAPH_NAME";

export const PRE_GRAPH_DATA = "PRE_GRAPH_DATA";

export function collectGraphData(graphEvalData) {

    return {
        type: ADD_GRAPH_INFO,
        payload: graphEvalData
    }

}
export function collectGraphEvaluatorName(graphEvalName) {

    return {
        type: ADD_GRAPH_NAME,
        payload: graphEvalName
    }

}
export function preEvaluationData(graphEvalPreData) {

    return {
        type: PRE_GRAPH_DATA,
        payload: graphEvalPreData
    }

}