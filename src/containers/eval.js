/**
 * Created by soroush on 7/23/18.
 */

import React, {Component} from 'react';

import ShortestPath from './../containers/shortest-path-form';
import GraphBox from './graph-box';

export  default class EvalComp extends Component {

    render() {
        const { match, location, history } = this.props;
        const nextGraph =  parseInt(this.props.match.params.id) + 1;
        return(
            <div>
                <GraphBox match = {match} location={location} history={history}/>
                <ShortestPath nextGraph = {nextGraph}/>
            </div>
        )
    }
}

