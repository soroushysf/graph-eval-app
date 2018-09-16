import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as FontAwesome from 'react-icons/lib/fa';

import GraphDepiction from '../containers/d3-graph';

class App extends Component {
  render() {
      const {graphData} = this.props;
      return (
      <div>

              <svg width="960" height="600" className="intro-graph">
                  <GraphDepiction graphData={graphData} svgWidth={960} svgHeight={600} interactive={true} />
              </svg>
          <Link className="btn btn-success intro-button"  to="/intro-to-evaluation">Graph Visualization Evaluation <FontAwesome.FaAngleDoubleRight/></Link>
      </div>

    );
  }
}

function mapStateToProps(state) {
    return {
        graphData: state.firstDynGraphData
    }
}

export default connect(mapStateToProps)(App)