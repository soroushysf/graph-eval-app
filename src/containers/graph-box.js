/**
 * Created by soroush on 9/23/18.
 */

import React, {Component} from 'react';

import GraphDepiction from './d3-graph';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

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
        const graphNumber = this.props.match.params.id;
        let svgZoom = 1;
        if( (Number(graphNumber) < 17 )) {
            svgZoom = 0.8;
        } else {
            svgZoom = 0.6;
        }
        let graphData = this.props.graphAjax[graphNumber-1];
        if(graphData) {
            graphData = {
                nodes : graphData.nodes.map((node) => {return {id: node.id, group: node.group}}),
                links : graphData.links.map((link) => {return {source: link.source, target: link.target}})
            }
        }
        return (
        <div className="col-xs-12">
            <svg width="1100" height="600" className="intro-graph">
                <GraphDepiction reRender={true} setShortestPathData={this.props.setShortestPathData} svgZoom={svgZoom}  graphNumber={graphNumber} graphData={graphData} svgWidth={1100} svgHeight={600} interactive={true}/>
            </svg>
        </div>
        )
    }
}
GraphBox.propTypes = {
    setShortestPathData: PropTypes.func
};

function mapStateToProps({graphAjax}) {
    return {
        graphAjax
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchGraph}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(GraphBox);