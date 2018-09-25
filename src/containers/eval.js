/**
 * Created by soroush on 7/23/18.
 */

import React, {Component} from 'react';

import ShortestPath from './../containers/shortest-path-form';
import GraphBox from './graph-box';

export  default class EvalComp extends Component {
    constructor(props){
        super(props);
        this.sendDataToShortestPath = this.sendDataToShortestPath.bind(this);
        this.state= {
            targetNode: ''
        }
    }



    render() {
        const { match, location, history } = this.props;
        const evalPage =  parseInt(this.props.match.params.id);
        return(
            <div>
                <GraphBox setShortestPathData={this.sendDataToShortestPath} match = {match} location={location} history={history}/>
                <ShortestPath targetNode={this.state.targetNode} match = {match} location={location} history={history}  evalPage = {evalPage}/>
            </div>
        )
    }
    sendDataToShortestPath( targetNode ){
        this.setState({ targetNode })
    }
}

