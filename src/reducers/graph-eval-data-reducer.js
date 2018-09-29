/**
 * Created by soroush on 9/29/18.
 */

import {ADD_GRAPH_INFO} from './../actions/graph-eval-data';

import {ADD_GRAPH_NAME} from './../actions/graph-eval-data';

const initialState = { graphEvaluatorName: '', graphEvaluations: []};

export default function (state = initialState, action) {

    switch (action.type){

        case ADD_GRAPH_INFO:
            if(state.graphEvaluations) {
                return {
                    graphEvaluatorName: state.graphEvaluatorName,
                    graphEvaluations: [...state.graphEvaluations, action.payload]
                };
            } else {
                return {
                    graphEvaluatorName: state.graphEvaluatorName,
                    graphEvaluations: [action.payload]
                }
            }

        case ADD_GRAPH_NAME:
            return {
                ...state.graphEvaluations,
                graphEvaluatorName: action.payload
            };
    }
    return state;
}