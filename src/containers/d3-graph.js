/**
 * Created by soroush on 7/14/18.
 */

import React, {Component} from 'react';
import * as d3 from 'd3';


class GraphDepiction extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log(this.props);
        this.depictGraph(this.props);
    }
    depictGraph({graphData,interactive = true, svgWidth, svgHeight, svgColor = true, svgZoom = 1}) {
        if(!graphData) {
            return null;
        }
        const svg = d3.select(this.refs.anchor)
                .attr("transform",`translate(0,0) scale(${svgZoom}, ${svgZoom})`),
            width = +svg.attr("width"),
            height = +svg.attr("height")
        ;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) {  return d.id; }).distance(100))
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(svgWidth/(svgZoom*2), svgHeight/(svgZoom*2)));

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graphData.links)
            .enter().append("line")
            .attr("stroke-width", function(d) { return Math.sqrt(d.value * 2); });


        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graphData.nodes)
            .enter().append("circle")
            .attr("r", 10)


        if(svgColor) {
            node.attr("fill", function (d) {
                return color(d.group);
            });
        }

        if(interactive) {
            node.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        }
        const labels = svg.append("g")
            .attr("class", "label")
            .selectAll("text")
            .data(graphData.nodes)
            .enter().append("text")
            .attr("dx", 10)
            .attr("dy", ".35em")
            .style("font-size", 16)
            .text(function(d) {
                return d.id
            });

        simulation
            .nodes(graphData.nodes)
            .on("tick", ticked)
            // .on("end", function() {
            //     node.each(function(d) {
            //         d.fx = d.x;
            //         d.fy = d.y;
            //     })
            // })
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
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

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
            <g ref="anchor"/>
        )
    }
}

export default GraphDepiction;