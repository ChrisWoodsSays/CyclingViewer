<script>
  // Create list of activities

  // import { fade } from 'svelte/transition';
  //import { tooltipable } from '../actions/tooltipable';

  export let activities = [];
  export let foregroundColor = '#FFFFFF';
  export let backgroundColor = '#000000';

  let tooltipTarget;

</script>

<div class="activities">
  <!-- use:css={{foregroundColor, backgroundColor}}
  bind:this={tooltipTarget} -->
    {#each activities as act}
      <li class="nav-item">
        <!-- <a class="nav-link" href="#">
          <span data-feather="file" class="align-text-bottom"></span>
        </a> -->
        {act.name}
      </li>
    {/each}
  </div>

  <!-- use:tooltipable = {{
    data: act.Title,
    target: tooltipTarget,
    foregroundColor: foregroundColor,
    backgroundColor: backgroundColor
  }} -->

<style>
</style>
