/**
 * Created by soroush on 7/16/18.
 */

import React, {Component} from 'react';

import { Field, reduxForm} from 'redux-form';
import * as FontAwesome from 'react-icons/lib/fa';
import SimpleGraph from './../components/simple-graph';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class IntroToEvaluation extends Component {
    renderNameInput(field) {
        return (
            <input
                type="text"
                {...field.input}
            />
        )
    }
    render() {
        const {graphData} = this.props;

        return(
            <div className="row">
                <h3 className="intro-header">Detect the shortest path between highlighted nodes</h3>
                <p className="intro-paragraph">When you click start, time will start to count and the first graph will be illustrated</p>
                <div className="col-xs-12">
                    <div className="col-xs-12">
                        <SimpleGraph reRender={false} graphData={graphData}/>
                    </div>
                    <div className="col-xs-12">
                        <div className="col-xs-6 text-align-right margin-top-20">Enter your name: </div>
                        <div className="col-xs-6 margin-top-20">
                            <Field
                                name="evaluatorNameInput"
                                component={this.renderNameInput}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 margin-top-20">
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

IntroToEvaluation = connect(mapStateToProps)(IntroToEvaluation);

export default reduxForm({
    form: "evaluatorName"
})(IntroToEvaluation);