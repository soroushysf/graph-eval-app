import { combineReducers } from 'redux';

import { reducer as formReducer} from 'redux-form';

import GraphData from './graph-data-reducer';
import StaticGraphData from './static-graph-data-reducer';
import FirstDynGraphData from './graph-eval-first-reducer';
import DistanceArray from './distance-reducer';
import TestData from './test-reducer-graph';
import GraphAjax from './graph-ajax-reducer';

const rootReducer = combineReducers({
    graphData : GraphData,
    staticGraphData : StaticGraphData,
    firstDynGraphData : FirstDynGraphData,
    distanceArray : DistanceArray,
    testData: TestData,
    graphAjax: GraphAjax,
    form: formReducer
});

export default rootReducer;
