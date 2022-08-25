<script lang="ts">
  import Title from './components/Title.svelte'
  import Credits from './components/Credits.svelte'
  import ClusterList from './components/ClusterList.svelte'
  import Map from './components/Map.svelte'
  import RouteProfile from './components/Credits.svelte'
  import { background as backgroundColor, temperature as foregroundColor } from './utils/colors';
  import { routeDataStore } from './stores.js';

  import { csv, timeParse } from 'd3';
	const parseDate = timeParse('%Y-%m-%d');
  
  let locations = [];

  csv('./data/locations.csv', (act) => {
	  return {
      location: act['location'],
      latitude: +act['latitude'],
      longitude: +act['longitude'],
      perimeterRadius: act['perimeterRadius'],
	  };
	}).then((d) => {
		locations = d;
	});
  
  let activities = [];
  csv('./data/activitiesStrava.csv', (act) => {
	  return {
      id: act['id'],
      actvityDate: act['start_date'],
      name: act['name'],
      elapsedTime: act['elapsed_time'],
      movingTime: act['moving_time'],
      distance: +act['distance'],
      elevationGain: +act['total_elevation_gain'],
      elevationLow: act['elev_low'],
      elevationHigh: act['elev_high'],

      achievement_count: +act['achievement_count'],
      average_speed: +act['average_speed'],
      average_temp: +act['average_temp'],
      average_watts: +act['average_watts'],
      device_watts: +act['device_watts'],
      gear_id: +act['gear_id'],
      kilojoules: +act['kilojoules'],
      kudos_count: +act['kudos_count'],
      location_country: +act['location_country'],
      manual: +act['manual'],
      max_speed: +act['max_speed'],
      pr_count: +act['pr_count'],
      sport_type: +act['sport_type'],
      start_date: +act['start_date'],
      start_date_local: +act['start_date_local'],
      start_lat: +act['start_latlng1'],
      start_lon: +act['start_latlng2'],
      end_lat: +act['end_latlng1'],
      end_lon: +act['end_latlng2'],
      timezone: +act['timezone'],
      //cluster: +act['cluster']
	  };
	}).then((d) => {
		activities = d;//.splice(0,10);//d.filter((dd) => dd.year >= 1920);
    console.log(activities)
	});

  let clusters = []
  $: clusters = Array.from(new Set(activities.map(act => act.cluster)))
    .sort(function(a, b){return a - b}); // compare required as need numeric sort

  let activityRoutes = [];
	csv('./data/activityRoutes.csv', (act) => {
	  return {
      id: act['id'],
      elevation: +act['ele'],
      latitude: +act['lat'],
      longitude: +act['lon'],
      distance: +act['distance']
	  };
	}).then((d) => {
		activityRoutes = d;//.splice(0,10);//d.filter((dd) => dd.year >= 1920);
    routeDataStore.set(activityRoutes);
    console.log(activityRoutes)
	});
  

</script>
<!-- https://getbootstrap.com/docs/5.2/examples/dashboard/ -->
<div class="app-wrapper">
  <!-- <main> -->
      <!-- <Title /> -->
      <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Cycling Viewer</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search">
        <div class="navbar-nav">
          <div class="nav-item text-nowrap">
            <a class="nav-link px-3" href="#">Sign out</a>
          </div>
        </div>
      </header>
      <div class="container-fluid">
        <div class="row">
          <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3 sidebar-sticky">
              <ClusterList activities = {activities}
              clusters = {clusters}/>
            </div>
          </nav>
          <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 class="h2">Map</h1>
              <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                  <button type="button" class="btn btn-sm btn-outline-secondary">Distance & Climb</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Map</button>
                </div>
                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                  <span data-feather="calendar" class="align-text-bottom"></span>
                  This week
                </button>
              </div>
            </div>
      
            <Map activities = {activities}
                  clusters = {clusters}
                  foregroundColor = {foregroundColor}
                  backgroundColor = {backgroundColor}/>
      
            <h2>Ride Profile</h2>
            <div>
              <RouteProfile />
            </div>
          </div>
        </div>
        <Credits />
      </div>
  <!-- </main> -->
</div>




<style>
  .app-wrapper {
      width: 100%;
      height: 100%;
  }

  /* <!-- From bootstrap --> */
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
  }

  .b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
  }

  .bi {
    vertical-align: -.125em;
    fill: currentColor;
  }

  .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
  }

  .nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

</style>