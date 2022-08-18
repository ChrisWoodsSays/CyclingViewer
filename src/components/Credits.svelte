<script>
  export let color = '#FFFFFF';
</script>

<div
  class="credits"
  style="color: {color};"
>
  <p>
    Created with Svelte and D3
  </p>
  <p>
    based on data from <a href="https://strava.com" target="_blank">Strava</a>
  </p>
  <p>
    (C) 2022 Chris Woods
  </p>
<!--   <p>
  <a href="https://drawingwithdata.com" target="_blank">Drawing with Data | Information Design</a>
  </p>
  <p>
    If you like this viz, consider <a href="https://www.buymeacoffee.com/higsch" target="_blank">buying me a coffee</a>. Thanks!
  </p> -->
  
</div>

<style>
  .credits {
    position: absolute;
    z-index: 70;
    bottom: 0;
    right: 0;
    width: 40%;
    padding: 1rem;
    font-family: var(--font);
    font-size: 0.7rem;
  }

  p {
    text-align: right;
    line-height: 1.5;
    opacity: 0.8;
  }

  a {
    color: inherit;
  }
</style>
