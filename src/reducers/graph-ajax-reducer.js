/**
 * Created by soroush on 9/16/18.
 */

import {FETCH_GRAPH} from './../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_GRAPH:
            return [ action.payload.data, ...state];
    }
    return state;
}