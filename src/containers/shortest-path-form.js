/**
 * Created by soroush on 7/23/18.
 */

import React, {Component} from 'react';

import { Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {preEvaluationData} from './../actions/graph-eval-data';


class ShortestPath extends Component {
    constructor(props){
        super(props);
        this.state= {
            time: 0
        }
    }

    tick() {
        this.setState({
            time: this.state.time+0.01
        });
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    componentDidMount(){
        this.intervalID = setInterval(
            () => this.tick(),
            10
        )

    }
    onSubmit(values){
        const {time} = this.state;
        this.props.preEvaluationData({ time: time.toFixed(2), shortestPathChosen: values.shortestPath, correctShortestPath: this.props.targetNode.dest.distance});
        this.props.history.push(this.evalPage);
    }

    render() {
        const {handleSubmit} = this.props;
        this.evalPage = `/eval-page-form/${this.props.evalPage}`;
        return(
            <div className="row">
                <form>
                    <div className="form-group  margin-top-20">
                        {this.props.targetNode.dest &&
                        <div className="col-sm-12 text-align-center">

                            shortest path between nodes 0 and {this.props.targetNode.dest.name}, has the length of:
                        </div>
                        }
                        <div className="col-sm-12 margin-top-20 margin-left-48">
                            <div className="col-xs-2 newRadios ">
                                <label>
                                    <Field
                                        name="shortestPath"
                                        value="2"
                                        component="input"
                                        type="radio"
                                        className="option-input radio"
                                    />
                                    2
                                </label>

                            </div>
                            <div className="col-xs-2 newRadios">
                                <label>
                                    <Field
                                        name="shortestPath"
                                        value="3"
                                        component="input"
                                        type="radio"
                                        className="option-input radio"
                                    />
                                    3
                                </label>
                            </div>
                            <div className="col-xs-2 newRadios">
                                <label>
                                    <Field
                                        name="shortestPath"
                                        value="4"
                                        component="input"
                                        type="radio"
                                        className="option-input radio"
                                    />
                                    4
                                </label>
                            </div>
                            <div className="col-xs-2 newRadios">
                                <label >
                                    <Field
                                        name="shortestPath"
                                        value="5"
                                        component="input"
                                        type="radio"
                                        className="option-input radio"
                                    />
                                    5
                                </label>
                            </div>
                            <div className="col-xs-2 newRadios">
                                <label >
                                    <Field
                                        name="shortestPath"
                                        value="6"
                                        component="input"
                                        type="radio"
                                        className="option-input radio"
                                    />
                                    6
                                </label>
                            </div>
                            <div className="col-xs-2 newRadios">
                                <label >
                                    <Field
                                        name="shortestPath"
                                        value="7"
                                        component="input"
                                        type="radio"
                                        className="option-input radio"
                                    />
                                    7
                                </label>
                            </div>
                        </div>
                        <div className="col-xs-12 margin-top-50">
                            <Link onClick={handleSubmit(this.onSubmit.bind(this))} className="btn btn-success intro-two-buttons intro-graph " to="/">submit and continue <FontAwesome.FaArrowRight/></Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({shortestPathState, graphEvalObject}){
    return {
        shortestPathState,
        graphEvalObject
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({preEvaluationData}, dispatch);
}
ShortestPath = connect(mapStateToProps, mapDispatchToProps)(ShortestPath);

export default reduxForm({
    form: "graphPath"
})(ShortestPath);