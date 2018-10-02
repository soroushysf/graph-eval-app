/**
 * Created by soroush on 7/14/18.
 */

import React, {Component} from 'react';
import * as d3 from 'd3';

import PropTypes from 'prop-types';

class GraphDepiction extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {
        this.depictGraph(this.props);
    }
    componentDidUpdate(){
        if(this.props.reRender) {
            this.depictGraph(this.props);
        }
    }
    calculate_shortest_path () {

        const nodes = this.props.graphData.nodes;
        const links = this.props.graphData.links;
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
        let dest = [];
        dist.forEach((node) => {
            if( (node.distance >= 3) && (node.distance <= 5)) {
                dest.push(node);
            }
        })
        return {dist: dist, dest: dest[Math.floor(Math.random() * dest.length)]};
    }
    depictGraph({graphData,interactive = true, svgWidth, svgHeight, svgColor = true, svgZoom = 1, graphNumber = 0}) {
        if(!graphData) {
            return null;
        }
        graphNumber = parseInt(graphNumber);

        const pathData = this.calculate_shortest_path();
        if (typeof this.props.setShortestPathData === 'function') {
            this.props.setShortestPathData(pathData);
        }
        let shortestPath = [], nodeTemp = pathData.dest;
        shortestPath.push(nodeTemp.name);

        while(nodeTemp.prev !== null) {
            pathData.dist.forEach((node) => {
                if (nodeTemp.prev === node.name) {
                    shortestPath.push(node.name);
                    nodeTemp = node;
                }
            });
        }
        for(let i = 0; i < shortestPath.length-1; i++) {
            graphData.links.forEach((link) => {
                if( (link.target === shortestPath[shortestPath.length-(i+1)]) && (link.source === shortestPath[shortestPath.length-(i+2)])) {
                    let linkDetailTemp = link.target;
                    link.target = link.source;
                    link.source = linkDetailTemp;
                }
            })
        }
        const svg = d3.select(this.refs.anchor)
                .attr("transform",`translate(0,0) scale(${svgZoom}, ${svgZoom})`),
            width = +svg.attr("width"),
            height = +svg.attr("height")
        ;
        svg.selectAll("*").remove();

        svg
            .append("svg:defs").selectAll("marker")
            .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX",25)
            .attr("refY", 0)
            .attr("markerWidth", 15)
            .attr("markerHeight", 15)
            .attr("orient", "auto")
            .append("svg:path")
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5');

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) {  return d.id; }).distance(function () {
                return 30*( (Math.random()+0.5)*4);
            }))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(svgWidth/(svgZoom*2), svgHeight/(svgZoom*2)));

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graphData.links)
            .enter().append("line")
            .style("stroke", "#333")
        ;
        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(graphData.nodes)
            .attr("class", "first")
            .enter().append("g")

        ;


        const labels = svg.append("g")
            .attr("class", "label")
            .selectAll("text")
            .data(graphData.nodes)
            .enter().append("text")
            .attr("dx", 10)
            .attr("dy", ".35em")
            .style("font-size", 24)
            .text(function(d) {
                if((d.id === "0") || (d.id === pathData.dest.name)) {
                    return d.id
                }
                else {
                    return '';
                }
            });
        switch (graphNumber) {
            case 0:
                if(svgColor) {
                    node
                        .append("circle")
                        .attr("fill", function (d) {
                            return color(d.group);
                        })
                        .attr("r", 10)
                }
                break;
            case 1:
                node
                    .append("circle")
                    .attr("fill", "#666")
                    .attr("r", 10);
                break;
            case 2:
                node
                    .append("circle")
                    .attr("fill", function (d) {
                        if(shortestPath.indexOf(d.id) === -1){
                            return "#666";
                        } else {
                            return "red";
                        }
                    })
                    .attr("r", 10)
                break;
            case 3:
                node
                    .append("circle")
                    .attr("r", function (d) {
                        if(shortestPath.indexOf(d.id) === -1){
                            return 10;
                        } else {
                            return 16;
                        }
                    })
                    .attr("fill", "#666")
                ;
                labels
                    .attr("dx", 18)
                break;
            case 4:
                link
                    .attr("stroke-width", function(d) {
                        if((shortestPath.indexOf(d.target) !== -1) && (shortestPath.indexOf(d.source) !== -1 ) ) {
                            return 5;
                        }
                        else {
                            return 0.8;
                        }
                    });
                node
                    .append("circle")
                    .attr("r", 10)
                    .attr("fill", "#666")
                ;
                break;
            case 5:
                node
                    .attr("class", function(d) {
                        if(shortestPath.indexOf(d.id) !== -1){
                            return "path-icon"
                        } else {
                            return "not-path";
                        }
                    })
                svg.selectAll(".path-icon")
                    .append('text')
                    .attr('font-family', 'FontAwesome')
                    .style('font-size', '24px' )
                    .style('fill', '#777')
                    .text(function() { return '\uf0fe' })
                ;
                svg.selectAll(".not-path")
                    .append("circle")
                    .attr("r", 10)
                    .attr("fill", "#666")
                ;
                labels
                    .attr("dx", 24)
                    .attr("dy", 0)
                break;
            case 6:
                node
                    .attr("class", function(d) {
                        if(shortestPath.indexOf(d.id) !== -1){
                            return "path-icon"
                        } else {
                            return "not-path";
                        }
                    })
                svg.selectAll(".path-icon")
                    .append('text')
                    .attr('font-family', 'FontAwesome')
                    .style('font-size', '38px' )
                    .style('fill', 'red')
                    .text(function() { return '\uf0fe' })
                ;
                svg.selectAll(".not-path")
                    .append("circle")
                    .attr("r", 10)
                    .attr("fill", "#666")
                ;
                link
                    .attr("stroke-width", function(d) {
                        if((shortestPath.indexOf(d.target) !== -1) && (shortestPath.indexOf(d.source) !== -1 ) ) {
                            return 5;
                        }
                        else {
                            return 0.8;
                        }
                    })
                ;
                labels
                    .attr("dx", -18)
                    .attr("dy", 0)
                break;
            case 7:
                node
                    .attr("fill", "#666")
                    .append("circle")
                    .attr("r", 10)
                link
                    .style("stroke", function (d) {
                        if((shortestPath.indexOf(d.target) !== -1) && (shortestPath.indexOf(d.source) !== -1 ) ) {
                            return "red";
                        }
                        else {
                            return "#333";
                        }
                    })
                break;
            case 8:
                node
                    .attr("fill", function(d){
                        if((d.id === "0") || (d.id === pathData.dest.name)){
                            return "red";
                        } else {
                            return "#666";
                        }
                    })
                    .append("circle")
                    .attr("r", 10)
                break;
            case 9:
                simulation
                    .force("link", d3.forceLink().distance(180));
                node
                    .append("circle")
                    .attr("fill", function (d) {
                        if(shortestPath.indexOf(d.id) === -1){
                            return "#666";
                        } else {
                            return "red";
                        }
                    })
                    .attr("r", 10)
                break;
            case 10:
                simulation
                    .force("link", d3.forceLink().distance(180));
                node
                    .append("circle")
                    .attr("r", function (d) {
                        if(shortestPath.indexOf(d.id) === -1){
                            return 10;
                        } else {
                            return 16;
                        }
                    })
                    .attr("fill", "#666")
                break;
            case 11:
                simulation
                    .force("link", d3.forceLink().distance(180));
                node
                    .attr("fill", "#666")
                    .append("circle")
                    .attr("r", 10)
                link
                    .style("stroke", function (d) {
                        if((shortestPath.indexOf(d.target) !== -1) && (shortestPath.indexOf(d.source) !== -1 ) ) {
                            return "red";
                        }
                        else {
                            return "#333";
                        }
                    })
                break;
            case 12:
                simulation
                    .force("charge", d3.forceManyBody().strength(-2000))
                    .force("link", d3.forceLink().distance(function () {
                        return 5*( (Math.random())*3);
                    }))
                node
                    .append("circle")
                    .attr("fill", function (d) {
                        if(shortestPath.indexOf(d.id) === -1){
                            return "#666";
                        } else {
                            return "red";
                        }
                    })
                    .attr("r", 10)
                break;
            case 13:
                simulation
                    .force("charge", d3.forceManyBody().strength(-2000))
                    .force("link", d3.forceLink().distance(function () {
                        return 5*( (Math.random())*3);
                    }))
                node
                    .append("circle")
                    .attr("r", function (d) {
                        if(shortestPath.indexOf(d.id) === -1){
                            return 10;
                        } else {
                            return 16;
                        }
                    })
                    .attr("fill", "#666")
                break;
            case 14:
                simulation
                    .force("charge", d3.forceManyBody().strength(-1700))
                    .force("link", d3.forceLink().distance(function () {
                        return 5*( (Math.random())*3);
                    }))
                node
                    .attr("fill", "#666")
                    .append("circle")
                    .attr("r", 10)
                link
                    .style("stroke", function (d) {
                        if((shortestPath.indexOf(d.target) !== -1) && (shortestPath.indexOf(d.source) !== -1 ) ) {
                            return "red";
                        }
                        else {
                            return "#333";
                        }
                    })
                break;
            case 15:
                link
                    .attr("marker-end", function (d) {
                        if((shortestPath.indexOf(d.target) !== -1) && (shortestPath.indexOf(d.source) !== -1 )){
                            return "url(#end)";
                        }else {
                            return "";
                        }
                    })
                node
                    .attr("fill", "#666")
                    .append("circle")
                    .attr("r", 10)
                break;
            default:
                node
                    .append("circle")
                    .attr("r", 10)
                    .attr("fill", function (d) {
                        return color(d.group);
                    })
                break;

        }
        if(interactive) {
            node.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        }


        simulation
            .nodes(graphData.nodes)
            .on("tick", ticked)
        ;

        simulation.force("link")
            .links(graphData.links);

        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
            // .attr("x", function(d) { return d.x; })
            // .attr("y", function(d) { return d.y; });
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            labels
                .attr("x", function(d) {
                    return d.x;
                })
                .attr("y", function(d) {
                    return d.y;
                });

        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    render() {
        return (
            <g id="global-g" ref="anchor"/>
        )
    }
}
GraphDepiction.propTypes = {
    setShortestPathData: PropTypes.func
};

export default GraphDepiction;