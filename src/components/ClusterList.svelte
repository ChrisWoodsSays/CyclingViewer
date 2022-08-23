<script>
  // Create list of clusters

  // import { fade } from 'svelte/transition';
  //import { tooltipable } from '../actions/tooltipable';

  export let activities = [];
  export let clusters = [];
  export let foregroundColor = '#FFFFFF';
  export let backgroundColor = '#000000';

  let tooltipTarget;


</script>

<div class="clusters">
  <!-- use:css={{foregroundColor, backgroundColor}}
  bind:this={tooltipTarget} -->
    <ul class="nav flex-column">
      {#each clusters as cluster}
        <li class="nav-item nav-link">
          <!-- <a class="nav-link" href="#">
            <span data-feather="file" class="align-text-bottom"></span>
          </a> -->
          {cluster}
          {#each activities.filter(a => a.cluster == cluster) as act}
            <li class="nav-item nav-link">
              <!-- <a class="nav-link" href="#">
                <span data-feather="file" class="align-text-bottom"></span>
              </a> -->
              {act.name}
            </li>
          {/each}
        </li>
      {/each}
    </ul>
  </div>

  <!-- use:tooltipable = {{
    data: act.Title,
    target: tooltipTarget,
    foregroundColor: foregroundColor,
    backgroundColor: backgroundColor
  }} -->

<style>
</style>
