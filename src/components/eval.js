/**
 * Created by soroush on 7/23/18.
 */

import React, {Component} from 'react';

// import GraphEval from './../containers/graph-eval';
import ShortestPath from './../containers/shortest-path-form';
import GraphDepiction from './../containers/d3-graph';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchGraph} from './../actions/index';

class EvalComp extends Component {
    componentDidMount(){
        console.log(this.props.fetchGraph(2));
    }
    render() {
        console.log(this.props.graphAjax);
        const nextGraph = parseInt(this.props.match.params.id) + 1;
        const graphData = this.props.testData;
        return(
            <div>
                <div className="col-xs-12">
                    <svg width="960" height="600" className="intro-graph">
                        <GraphDepiction graphData={graphData} svgWidth={960} svgHeight={600} interactive={true}/>
                    </svg>
                </div>
                {/*<ShortestPath nextGraph = {nextGraph}/>*/}
            </div>
        )
    }
}

function mapStateToProps({testData, graphAjax}) {
    return {
        testData,
        graphAjax
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchGraph}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EvalComp);