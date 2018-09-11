/**
 * Created by soroush on 7/23/18.
 */

import React, {Component} from 'react';

import GraphEval from './../containers/graph-eval';
import ShortestPath from './../containers/shortest-path-form';

export default class EvalComp extends Component {

    render() {
        console.log(this.props.match.params);
        const nextGraph = parseInt(this.props.match.params.id) + 1;
        console.log(nextGraph);
        return(
            <div>
                <GraphEval/>
                <ShortestPath nextGraph = {nextGraph}/>
            </div>
        )
    }
}