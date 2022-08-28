<script>
    // Create map of activities
    import {onMount} from "svelte";
    import { fade } from 'svelte/transition';
    import { extent, scaleLinear, scaleOrdinal, schemeCategory10 } from "d3";
    import * as d3 from 'd3';
    import { scaleLog } from 'd3';
    
    // import { fade } from 'svelte/transition';
    import { tooltipable } from '../actions/tooltipable';

    export let activities = [];
    export let clusters = [];
    export let foregroundColor = '#FFFFFF';
    export let backgroundColor = '#000000';

    let tooltipTarget;

    //const width = 900, height = 600;
    let width = 0 , height = 500;
    let delay = 2000;
    const margin = { top: 15, bottom: 50, left: 50, right: 20 };

    let innerHeight , innerWidth
    $: innerHeight = height - margin.top - margin.bottom,
        innerWidth = width - margin.left - margin.right;

    $: xScale = scaleLinear()
        .domain(extent(activities, (d)  =>  d.distance))
        .range([0, innerWidth]); 

    $: yScale = scaleLinear()
        .domain(extent(activities, (d)  =>  d.elevationGain))
        .range([innerHeight, 0]);

    const radiusCountScale = scaleLog()
		.domain(extent(activities.map(d => d.elevationGain)))
		.range([5 , 25]);

    $: scaleClusterColour = scaleOrdinal()
        .domain(clusters)
        .range(schemeCategory10);

    // $: console.log(height)
    // $: console.log(width)
    $: height = width * 2/3
    $: console.log(activities)

    // var simulation = d3.forceSimulation(activities)
    //     //.force('charge', d3.forceManyBody().strength(5))
    //     .force('x', d3.forceX().x(function(d) {
    //         return xScale(d.distance);
    //     }))
    //     .force('y', d3.forceY().y(function(d) {
    //         return yScale(d.elevationGain);
    //     }))
    //     // .force('collision', d3.forceCollide().radius(function(d) {
    //     //     return radiusCountScale(d.elevationGain*0.7);
    //     // }))
    //     .on('tick', ticked);

  function ticked() {
    var u = d3.select('svg g g')
      .selectAll('circle')
      .data(activities);

    console.log(u)

    u.enter()
      // .append('circle')
      // .attr('r', function(d) {
      //   return d.radius;
      // })
      // .style('fill', function(d) {
      //   return categoryColorScale[d.group];
      // })
        .merge(u)
            .attr('cx', function(d) {
                return d.x;
            })
            .attr('cy', function(d) {
                return d.y;
            })
        u.exit().remove();
  }

</script>

<div
    class="xxx"
    bind:clientWidth={width}
>
    <svg
        width={width}
        height={height}
    >
        <g transform={`translate(${margin.left},${margin.top})`}>

            <!-- <Axis {innerHeight} {margin} scale={xScale} position="bottom" />
            <Axis {innerHeight} {margin} scale={yScale} position="left" /> -->
            <!-- <text transform={`translate(${-30},${innerHeight / 2}) rotate(-90)`}
                    >Elevation</text> -->
            <g class="circles">
                use:css={{foregroundColor, backgroundColor}}
                bind:this={tooltipTarget}
                {#each activities as data, i}
                    <div
                        class="explainer"
                        style="left: {xScale(data.distance)}px;
                            top: {yScale(data.elevationGain)}px;"
                            in:fade={{duration: 200, delay: delay + Math.random() * 1000}}
                    >
                    </div>
                    <circle
                        use:tooltipable={{data: data,
                            target: tooltipTarget,
                            foregroundColor: foregroundColor,
                            backgroundColor: backgroundColor
                        }}
                        cx={xScale(data.distance)}
                        cy={yScale(data.elevationGain)}
                        r="10"
                        opacity=0.6
                        fill = {scaleClusterColour(data.cluster)}
                    />
                {/each}
            </g>
            <text x={innerWidth / 2} y={innerHeight + 35}>Distance</text>
        </g>
    </svg>
</div>
              <!-- fill={`${colorScale(data.class)}`} -->

<style>
    /* From wordbubbles */
    .explainers {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .explainer {
        position: absolute;
        z-index: 80;
    }

    .explainer-content {
        position: relative;
        left: -50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.8rem;
        height: 1.8rem;
        margin-top: -50%;
        color: var(--foregroundColor);
        background-color: var(--backgroundColor);
        opacity: 0.8;
        line-height: 1;
        font-family: var(--font);
        font-size: 1.1rem;
        font-weight: bold;
        border: 0.15rem solid var(--foregroundColor);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s;
    }

    .explainer-content:hover {
        color: var(--backgroundColor);
        background-color: var(--foregroundColor);
    }
</style>




