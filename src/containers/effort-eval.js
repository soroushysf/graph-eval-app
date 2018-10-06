/**
 * Created by soroush on 9/25/18.
 */

import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import * as FontAwesome from 'react-icons/lib/fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {collectGraphData} from './../actions/graph-eval-data';
import {postEvaluation} from './../actions/index';

class EffortEval extends Component {

    onSubmit(values){
        this.props.collectGraphData({
            shortestPathEval: values.shortestPathEval,
            time: this.props.preEvalObject.time,
            shortestPathChosen: this.props.preEvalObject.shortestPathChosen,
            correctShortestPath: this.props.preEvalObject.correctShortestPath
        });
        if( Number(this.props.match.params.id) === 15) {
            this.props.history.push('/last-page');

        } else {
            this.props.history.push(this.nextGraph);
        }
    }
    componentWillUnmount() {
        if(Number(this.props.match.params.id) === 15) {
            this.props.postEvaluation(this.props.graphEvalObject);
        }
    }

    render(){
        const {handleSubmit} = this.props;
        this.nextGraph =  `/eval-page/${parseInt(this.props.match.params.id)+1}`;
        return(
            <div className="row">
                <form action="">
                    <div className="col-xs-12 margin-top-200 text-align-center">
                        Enter the mental effort you devoted for this task(10 being the highest and 1 the lowest):
                    </div>
                    <div className="col-xs-12 margin-top-20 text-align-center">
                        <label>

                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="1"
                            />
                            1
                        </label>
                        <label>
                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="2"
                            />
                            2
                        </label>
                        <label>
                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="3"
                            />
                            3
                        </label>
                        <label>
                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="4"
                            />
                            4
                        </label>
                        <label>
                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="5"
                            />
                            5
                        </label>
                        <label>
                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="6"
                            />
                            6
                        </label>
                        <label>
                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="7"
                            />
                            7
                        </label>
                        <label>
                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="8"
                            />
                            8
                        </label>
                        <label>
                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="9"
                            />
                            9
                        </label>
                        <label>
                            <Field
                                name="shortestPathEval"
                                component="input"
                                type="radio"
                                className="option-input radio option-input-eval"
                                value="10"
                            />
                            10
                        </label>
                    </div>
                    <div className="col-xs-12 margin-top-200">
                        <Link onClick={handleSubmit(this.onSubmit.bind(this))} className="btn btn-success intro-two-buttons intro-graph " to='/'>submit and continue <FontAwesome.FaArrowRight/></Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({preEvalObject, graphEvalObject}) {
    return {
        preEvalObject,
        graphEvalObject
    }
}

function mapDispatchToProps(dispatch) {
        return bindActionCreators({collectGraphData, postEvaluation}, dispatch);
}

EffortEval = connect(mapStateToProps, mapDispatchToProps)(EffortEval);


export default reduxForm({
    form: "graphEvalForm"
})(EffortEval);