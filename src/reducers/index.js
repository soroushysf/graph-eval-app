import { combineReducers } from 'redux';

import { reducer as formReducer} from 'redux-form';

import GraphData from './graph-data-reducer';
import FirstDynGraphData from './graph-eval-first-reducer';
import DistanceArray from './distance-reducer';
import GraphAjax from './graph-ajax-reducer';

const rootReducer = combineReducers({
    graphData : GraphData,
    firstDynGraphData : FirstDynGraphData,
    distanceArray : DistanceArray,
    graphAjax: GraphAjax,
    form: formReducer
});

export default rootReducer;
