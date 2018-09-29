/**
 * Created by soroush on 9/29/18.
 */


import {PRE_GRAPH_DATA} from './../actions/graph-eval-data';

export default function (state = null, action) {

    switch (action.type){

        case PRE_GRAPH_DATA:
            return action.payload;
    }
    return state;
}