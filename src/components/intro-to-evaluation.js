/**
 * Created by soroush on 7/16/18.
 */

import React, {Component} from 'react';

import * as FontAwesome from 'react-icons/lib/fa';
import GraphDepiction from './../containers/d3-graph';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class IntroToEvaluation extends Component {

    render() {
        const {graphData} = this.props;

        return(
            <div className="row">
            <h3 className="intro-header">Detect the shortest path between highlighted nodes</h3>
                <p className="intro-paragraph">When you click start, time will start to count and the first graph will be illustrated</p>
                <div className="col-xs-12">
                    <div className="col-xs-12">

                            <svg width="800" height="600" className="intro-graph">
                                <GraphDepiction graphData={graphData} svgWidth={600} svgHeight={400} svgZoom={0.8}/>
                            </svg>
                <Link className="btn btn-success intro-two-buttons intro-graph" to='/eval-page/1'>start interactive graphs <FontAwesome.FaMagic/></Link>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps({graphData}) {
    return {
        graphData
    }
}

export default connect(mapStateToProps)(IntroToEvaluation)