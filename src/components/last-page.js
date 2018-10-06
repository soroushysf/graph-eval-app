/**
 * Created by soroush on 10/6/18.
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import * as FontAwesome from 'react-icons/lib/fa';


export default class LastPage extends Component {

    render(){
        return(
            <div>
                <h2 className="text-align-center margin-top-200">Thank you for your evaluation!</h2>
                <Link className="btn btn-success intro-button margin-top-50"  to="/intro-to-evaluation">Back to first Page <FontAwesome.FaAngleDoubleRight/></Link>
            </div>
        )
    }
}