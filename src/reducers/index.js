import { combineReducers } from 'redux';

import { reducer as formReducer} from 'redux-form';

import GraphData from './graph-data-reducer';
import StaticGraphData from './static-graph-data-reducer';
import FirstDynGraphData from './graph-eval-first-reducer';
import DistanceAction from './distance-reducer';

const rootReducer = combineReducers({
    graphData : GraphData,
    staticGraphData : StaticGraphData,
    firstDynGraphData : FirstDynGraphData,
    distanceArray : DistanceAction,
    form: formReducer
});

export default rootReducer;
