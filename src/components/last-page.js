/**
 * Created by soroush on 10/6/18.
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postEvaluation} from './../actions/index';
import * as FontAwesome from 'react-icons/lib/fa';


class LastPage extends Component {

    componentDidMount(){
        this.props.postEvaluation(this.props.graphEvalObject);
    }
    render(){
        return(
            <div>
                <h2 className="text-align-center margin-top-200">Thank you for your evaluation!</h2>
                <Link className="btn btn-success intro-button margin-top-50"  to="/intro-to-evaluation">Back to first Page <FontAwesome.FaAngleDoubleRight/></Link>
            </div>
        )
    }
}
function mapStateToProps({graphEvalObject}) {
    return {
        graphEvalObject
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({postEvaluation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LastPage);