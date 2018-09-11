/**
 * Created by soroush on 7/23/18.
 */

import React, {Component} from 'react';
import GraphDepiction from './d3-graph';

import {connect} from 'react-redux';

class GraphEval extends Component {

    render() {
        const graphData = this.props.firstDynGraphData;
        return(
            <div className="row">
                <div className="col-xs-12">
                    <svg width="960" height="600" className="intro-graph">
                    <GraphDepiction graphData={graphData} svgWidth={960} svgHeight={600} interactive={true}/>
                    </svg>
                </div> 
            </div>
        )
    }
}

function mapStateToProps({firstDynGraphData}) {
    return {
        firstDynGraphData
    }
}
export default connect(mapStateToProps)(GraphEval);

