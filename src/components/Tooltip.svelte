<script>
  import { fade } from 'svelte/transition';
  import { css } from '../actions/css';
  import { ordinal_suffix } from '../utils/numberFormat';
  import WordLineChart from './WordLineChart.svelte';
  import { everyOccurenceDataStore } from '../stores.js';

  export let word = 'word Key';
  export let displayWord = 'Display Word';
  export let title = 'Title';
  export let year = 'Year';
  export let group = 'Group';
  export let count = 'Count';
  export let allTimeCount = 'All Time Count';
  export let peakYear = 'Peak Year';
  export let periodCountRank = 'CountRank';
  export let allTimeRank = 'CountRank';
 
  export let wikiLink = '';
  export let imageURL = '';
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
  //$: topPos = `${Math.max(margin.top, Math.min(y, targetHeight - height - margin.bottom))}px`;
  $: topPos = `${y + height > targetHeight - margin.bottom ? y - height - 25: y}px`;
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let occurences
  const filt=(word)=>{
  //const filt(word) {
    occurences = $everyOccurenceDataStore.filter(occurence => occurence.word != "poles");
    //console.log("mycounts: ",mycounts)
    //return occurences;
  }

  //console.log($everyOccurenceDataStore)
</script>

<div
  class="tooltip"
  use:css={{leftPos, topPos, foregroundColor, backgroundColor}}
  transition:fade={{duration: 200}}
>
  <div
    class="tooltip-content"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <h2>
      {displayWord}, {year}
    </h2>
    <p>
      {title}
    </p>
    <p>
      [{group}]
    </p>
    <p>
      {numberWithCommas(count)} mentions ({ordinal_suffix(periodCountRank)})
    </p>
    <p>
      {numberWithCommas(allTimeCount)} mentions in total, peaking in {peakYear} 
    </p>
<!--     {#if imageURL !== "NA"}
      <img src = {imageURL} alt = "xxx">
    {/if} -->
    <WordLineChart
      
      everyOccurenceData={$everyOccurenceDataStore.filter(occurence => occurence.word == word)}

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

  .tooltip {
    position: absolute;
    z-index: 100;
    left: var(--leftPos);
    top: var(--topPos);
  }

  .tooltip-content {
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
