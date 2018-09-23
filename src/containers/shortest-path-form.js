/**
 * Created by soroush on 7/23/18.
 */

import React, {Component} from 'react';

import { Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa';
import {connect} from 'react-redux';

class ShortestPath extends Component {
    renderPathInput(field) {
        return (
                <input
                    type="text"
                    {...field.input}
                />
        )
    }
    render() {
        const nextGraph = `/eval-page/${this.props.nextGraph}`;
        return(
            <div className="row">
            <form>
                <div className="form-group  margin-top-20">
                    {this.props.targetNode.dest &&
                    <div className="col-sm-6 text-align-right">

                        shortest path between nodes 0 and {this.props.targetNode.dest.name} is has the length:
                    </div>
                    }
                    <div className="col-sm-6">
                        <Field
                            name="shortestPath"
                            component={this.renderPathInput}
                        />
                    </div>
                    <div className="col-xs-12 margin-top-20">
                        <Link className="btn btn-success intro-two-buttons intro-graph " to={nextGraph}>submit answer and continue <FontAwesome.FaArrowRight/></Link>
                    </div>
                </div>
            </form>
            </div>
        )
    }
}

function mapStateToProps({shortestPathState}){
    return {
        shortestPathState
    }
}

ShortestPath = connect(mapStateToProps)(ShortestPath);

export default reduxForm({
    form: "graphPath"
})(ShortestPath);