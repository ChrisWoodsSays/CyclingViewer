<script>
    // Create map of activities
    import {onMount} from "svelte";

    import { extent, scaleLinear, scaleOrdinal, schemeCategory10 } from "d3";
    
    // import { fade } from 'svelte/transition';
    import { tooltipable } from '../actions/tooltipable';

    export let activities = [];
    export let clusters = [];
    export let foregroundColor = '#FFFFFF';
    export let backgroundColor = '#000000';

    //const width = 900, height = 600;
    let width = 0 , height = 500;
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

    $: scaleClusterColour = scaleOrdinal()
        .domain(clusters)
        .range(schemeCategory10);

    // $: console.log(height)
    // $: console.log(width)
    $: height = width * 2/3


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
        <text transform={`translate(${-30},${innerHeight / 2}) rotate(-90)`}
            >Elevation</text>
        {#each activities as data, i}
            <circle
                cx={xScale(data.distance)}
                cy={yScale(data.elevationGain)}
                r="10"
                opacity=0.6
                fill = {scaleClusterColour(data.cluster)}
            />
        {/each}
        <text x={innerWidth / 2} y={innerHeight + 35}>Distance</text>
        </g>
    </svg>
</div>
              <!-- fill={`${colorScale(data.class)}`} -->

<style>
    
</style>




