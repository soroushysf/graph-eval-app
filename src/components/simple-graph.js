/**
 * Created by soroush on 9/23/18.
 */

import React, {Component} from 'react';
import GraphDepiction from './../containers/d3-graph';

export default class SimpleGraph extends Component{

    render(){
        const {graphData, reRender} = this.props;
        return (
            <svg width="800" height="600" className="intro-graph">
                <GraphDepiction reRender={reRender} graphData={graphData} svgWidth={600} svgHeight={400} svgZoom={0.8}/>
            </svg>
        )
    }
}