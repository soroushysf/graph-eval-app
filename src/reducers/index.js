import { combineReducers } from 'redux';

import { reducer as formReducer} from 'redux-form';

import GraphData from './graph-data-reducer';
import FirstDynGraphData from './graph-eval-first-reducer';
import DistanceArray from './distance-reducer';
import GraphAjax from './graph-ajax-reducer';
import GraphEvalObject from './graph-eval-data-reducer';
import PreEvalObject from './pre-eval-graph-reducer';

const rootReducer = combineReducers({
    graphData : GraphData,
    firstDynGraphData : FirstDynGraphData,
    distanceArray : DistanceArray,
    graphAjax: GraphAjax,
    graphEvalObject: GraphEvalObject,
    preEvalObject: PreEvalObject,
    form: formReducer
});

export default rootReducer;
