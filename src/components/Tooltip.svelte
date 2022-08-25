<script>
  import { fade } from 'svelte/transition';
  import { css } from '../actions/css';
  import RideProfileChart from './RideProfileChart.svelte'
  import { routeDataStore } from '../stores.js';

  export let id;
  export let actvityDate = 'Display Word';
  export let name = 'Activity Name';
  export let moving_time;
  export let distance;
  export let elevationGain;
  export let average_speed;

  export let x = 0;
  export let y = 0;
  export let foregroundColor = '#FFFFFF';
  export let backgroundColor = '#000000';
  export let targetWidth = 0;
  export let targetHeight = 0;

  let width = 0;
  let height = 0;

  const margin = {
    top: 2,
    right: 2,
    bottom: 2,
    left: 2
  };

  $: leftPos = `${Math.max(margin.left + width / 2, Math.min(x, targetWidth - width / 2 - margin.right))}px`;
  $: topPos = `${y + height > targetHeight - margin.bottom ? y - height - 25: y}px`;

  console.log(name)
  // $: console.log(leftPos, topPos)
  // $: console.log(targetHeight, targetWidth)
  
</script>

<div
  class="ms-tooltip"
  use:css={{leftPos, topPos, foregroundColor, backgroundColor}}
  transition:fade={{duration: 200}}
>
  <div
    class="ms-tooltip-content"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <h2>
      {name}, {actvityDate}
    </h2>
    <p>
      <!-- {title} -->
    </p>
    <p>
      <!-- [{group}] -->
    </p>
    <p>
      Distance {distance}, Elevation: {elevationGain}
    </p>
    <p>
      Moving Time: {moving_time}, Average Speed: {average_speed}
    </p>
    <RideProfileChart routeData={$routeDataStore.filter(route => route.id == id)}
  />
  </div>
</div>

<style>
  img {
    width: 200px;
    height: 300px;
    object-fit: contain;
  }

  .word-title {
    font-size: 0.5rem;
    line-height: 50%;
  }

  .ms-tooltip {
    position: absolute;
    z-index: 100;
    left: var(--leftPos);
    top: var(--topPos);
  }

  .ms-tooltip-content {
    position: relative;
    left: -50%;
    max-width: 250px;
    padding: 0.6rem;
    color: var(--foregroundColor);
    background-color: var(--backgroundColor);
    font-family: var(--font);
    border: 0.1rem solid var(--foregroundColor);
    border-radius: 0.2rem;
    box-shadow: 0 0 2px var(--foregroundColor), 
                0 0 4px var(--foregroundColor);
  }

  h2, p {
    opacity: 0.85;
  }

  h2 {
    font-size: 1.1rem;
    font-weight: normal;
  }

  p {
    margin: 0.4rem 0 0 0;
    line-height: 1.3;
    font-size: 0.8rem;
  }
</style>
