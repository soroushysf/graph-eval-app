/**
 * Created by soroush on 9/23/18.
 */

import React, {Component} from 'react';

import GraphDepiction from './d3-graph';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchGraph} from './../actions/index';

class GraphBox extends Component {

    componentDidMount(){
        this.props.fetchGraph(this.props.match.params.id);
    }
    componentDidUpdate(prevProps) {
        if((prevProps.location.pathname !== this.props.location.pathname)){
            this.props.fetchGraph(this.props.match.params.id);
        }
    }
    render(){
        let graphData = this.props.graphAjax[this.props.match.params.id-1];
        if(graphData) {
            graphData = {
                nodes : graphData.nodes.map((node) => {return {id: node.id, group: node.group}}),
                links : graphData.links.map((link) => {return {source: link.source, target: link.target}})
            }
        }
        return (
        <div className="col-xs-12">
            <svg width="960" height="600" className="intro-graph">
                <GraphDepiction graphData={graphData} svgWidth={960} svgHeight={600} interactive={true}/>
            </svg>
        </div>
        )
    }
}

function mapStateToProps({graphAjax}) {
    return {
        graphAjax
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchGraph}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(GraphBox);