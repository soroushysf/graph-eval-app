/**
 * Created by soroush on 9/11/18.
 */

import React, {Component} from 'react';

import {dijkstraDistance} from './../actions/index';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';

class Dijkstra extends Component {

    calculate_shortest_path () {
        const nodes = this.props.graph.nodes;
        const links = this.props.graph.links;
        let dist = [], q = [], u = '';
        nodes.forEach((node) => {
            dist.push({ name: node.id, distance: 1000*node.id, visited: false, prev: null});
        q[node.id] = node.id;
    });
        while(q.length > 0) {
            let min_val = {name: "1000", distance: 10000000000, visited: false, prev: null};
            dist.forEach((node) => {
                if((node.distance < min_val.distance) && (!node.visited)){
                min_val = node;
            }
        })
            dist.forEach((item) => {
                if(item.name === min_val.name){
                item.visited = true;
            }
        })
            u = min_val;
            q = q.filter((item) => {
                    return item !== u.name;
        })
            for(let i = 0; i <= q.length; i ++) {
                links.forEach((link) => {
                if(( (link.source === u.name) && (link.target === q[i])) || ((link.target === u.name) && (link.source === q[i]) )) {
                        let alt = u.distance + 1;
                        dist.forEach((item) => {
                            if( (item.name === q[i]) && ( alt < item.distance) ) {
                        item.distance = alt;
                                item.prev = u.name;
                            }
                        })
                    }
                })
            }
        }
        this.props.dijkstraDistance(dist);
    }
    componentDidMount () {
        this.calculate_shortest_path();
    }
    render() {
        return null;
    }

}

function mapStateToProps(state) {
    return {
        graph: state.firstDynGraphData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({dijkstraDistance: dijkstraDistance}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dijkstra);