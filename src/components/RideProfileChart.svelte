<script>
  // Draws a single Line Chart showing the use of a word over time

  import { draw } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { extent } from 'd3';
	import { scaleLinear, scaleLog } from 'd3';
  // import { extent } from 'd3-array';
	// import { scaleLinear } from 'd3-scale';
	import { line, curveBasis } from 'd3-shape';
  import { routeDataStore } from '../stores.js';
  import { css } from '../actions/css';

  // the props
  export let wordToChart = "Word To Chart";
  export let routeData = [];
  export let foregroundColor = '#FFFFFF';
  export let backgroundColor = '#000000';

  let tooltipTarget;

  //export let strokeColor = 'white';
  //export let strokeWidth = 2;
  //export let strokeOpacity = 1.0; */

  // the scales
  const xScale = scaleLinear()
		.domain(extent(routeData.map(d => d.distance)))
		.range([0 , 100]);
  const yScale = scaleLinear()
		.domain(extent(routeData.map(d => d.elevation)))
		.range([100 , 0]);

  // the path generator
	const pathLine = line()
		.x(d => xScale(d.distance))
		.y(d => yScale(d.elevation))
		.curve(curveBasis);

</script>

<svg viewBox="0 0 100 100">
		<path transition:draw={{duration: 1000}}
					d={pathLine(routeData)} />
</svg>

<style>
	path {
		stroke: white;
		stroke-width: 0.5;
		fill: none;
		stroke-linecap: round;
	}
</style>