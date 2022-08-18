<script lang="ts">
  // import svelteLogo from './assets/svelte.svg'
  // import Counter from './lib/Counter.svelte'
  import Title from './components/Title.svelte'
  import Credits from './components/Credits.svelte'
  import RideList from './components/RideList.svelte'
  import Map from './components/Map.svelte'
  import RouteProfile from './components/Credits.svelte'

  import { csv, timeParse } from 'd3';
	// import { everyOccurenceDataStore } from './stores.js';
	const parseDate = timeParse('%Y-%m-%d');
  
	let activities = [];
  
	csv('./data/activities.csv', (act) => {
	  return {
      id: act['Activity ID'],
      actvityDate: act['Activity Date'],
      name: act['Activity Name'],
      type: act['Activity Type'],
      description: act['Activity Description'],
      //elapsedTime: act['Elapsed Time,  DUPLICETE FIELD
      // distance: act['Distance,,  DUPLICETE FIELD
      //: act['Max Heart Rate,
      //: act['Relative Effort,
      //: act['Commute,
      gear: act['Activity Gear'],
      filename: act['Filename'],
      // Athlete Weight
      // Bike Weight,
      elapsedTime: act['Elapsed Time'],
      movingTime: act['Moving Time'],
      distance: act['Distance'],
      maxSpeed: act['Max Speed'],
      averageSpeed: act['Average Speed'],
      elevationGain: act['Elevation Gain'],
      elevationLoss: act['Elevation Loss'],
      elevationLow: act['Elevation Low'],
      elevationHigh: act['Elevation High'],
      maxGrade: act['Max Grade'],
      // Average Grade,
      // Average Positive Grade,
      // Average Negative Grade,
      // Max Cadence,
      // Average Cadence,
      // Max Heart Rate,
      // Average Heart Rate,
      // Max Watts,
      averageWatts: act['Average Watts'],
      calories: act['Calories']
      // Max Temperature,
      // Average Temperature,
      // Relative Effort,
      // Total Work,
      // Number of Runs,
      // Uphill Time,
      // Downhill Time,
      // Other Time,
      // Perceived Exertion
	  };
	}).then((d) => {
		activities = d;//d.filter((dd) => dd.year >= 1920);
	});

</script>
<!-- https://getbootstrap.com/docs/5.2/examples/dashboard/ -->
<main>
  <div>
    <!-- <Title /> -->
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>
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
            <RideList activities = {activities}/>
          </div>
        </nav>
    
        <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Map</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group me-2">
                <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar" class="align-text-bottom"></span>
                This week
              </button>
            </div>
          </div>
    
          <!-- <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas> -->
          <Map />
    
          <h2>Ride Profile</h2>
          <div>
            <RouteProfile />
          </div>
        </div>
      </div>
      <Credits />
    </div>
</main>

<!-- From bootstrap -->
<style>
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