/**
 * Created by soroush on 7/16/18.
 */

import React, {Component} from 'react';

import * as FontAwesome from 'react-icons/lib/fa';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import GraphDepiction from './../containers/d3-graph';
class IntroToEvaluation extends Component {

    render() {
        const {graphData} = this.props;
        const {staticGraphData} = this.props;
        return(
            <div className="row">
            <h3 className="intro-header">Detect the shortest path between highlighted nodes</h3>
                <p className="intro-paragraph">When you click start, time will start to count and the first graph will be illustrated</p>
                <div className="col-xs-12">
                    <div className="col-xs-6">
                <svg width="480" height="300" className="intro-graph">
                <GraphDepiction  graphData={graphData}  svgWidth={480} svgHeight={300} svgZoom={0.5}/>
                </svg>
                <Link className="btn btn-success intro-two-buttons intro-graph" to='/eval-page/1'>start interactive graphs <FontAwesome.FaMagic/></Link>
                    </div>
                    <div className="col-xs-6">

                    <svg width="480" height="300"  className="intro-graph">
                <GraphDepiction graphData={staticGraphData} svgWidth={480} svgHeight={300} interactive={false} svgColor={false} svgZoom={0.5}/>
                </svg>
                <Link className="btn btn-success intro-two-buttons intro-graph" to="/">start static graphs <FontAwesome.FaObjectGroup/></Link>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps({graphData, staticGraphData}) {
    return {
        graphData,
        staticGraphData
    }
}

export default connect(mapStateToProps)(IntroToEvaluation)