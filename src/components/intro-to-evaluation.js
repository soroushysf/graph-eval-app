/**
 * Created by soroush on 7/16/18.
 */

import React, {Component} from 'react';

import { Field, reduxForm} from 'redux-form';
import * as FontAwesome from 'react-icons/lib/fa';
import SimpleGraph from './../components/simple-graph';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {collectGraphEvaluatorName} from './../actions/graph-eval-data';

class IntroToEvaluation extends Component {
    onSubmit(values) {
        this.props.collectGraphEvaluatorName(values.evaluatorNameInput);
        this.props.history.push('/eval-page/1');
    }
    render() {
        const {handleSubmit} = this.props;
        const {graphData} = this.props;

        return(
            <div className="row">
                <h3 className="intro-header">Detect the shortest path between highlighted nodes</h3>
                <div className="col-xs-12">
                    <div className="col-xs-12">
                        <SimpleGraph reRender={false} graphData={graphData}/>
                    </div>
                    <div className="col-xs-12">
                        <div className="col-xs-6 text-align-right margin-top-20">Enter your name: </div>
                        <div className="col-xs-6 margin-top-20">
                            <Field
                                name="evaluatorNameInput"
                                component="input"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 margin-top-20">
                        <Link onClick={handleSubmit(this.onSubmit.bind(this))} className="btn btn-success intro-two-buttons intro-graph" to='/eval-page/1'>start interactive graphs <FontAwesome.FaMagic/></Link>
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
function mapDispatchToProps(dispatch) {
    return bindActionCreators({collectGraphEvaluatorName}, dispatch);
}
IntroToEvaluation = connect(mapStateToProps, mapDispatchToProps)(IntroToEvaluation);

export default reduxForm({
    form: "evaluatorName"
})(IntroToEvaluation);