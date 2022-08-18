<script>
    // Create map of activities
    import {onMount} from "svelte";
    // import {GeoJSON, LeafletMap, TileLayer} from 'svelte-leafletjs';
    // import { fade } from 'svelte/transition';
    import { tooltipable } from '../actions/tooltipable';

    export let activities = [];
    export let foregroundColor = '#FFFFFF';
    export let backgroundColor = '#000000';

    let tooltipTarget;

    const mapOptions = {
        center: [1.250111, 103.830933],
        zoom: 13,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };
    const geoJsonOptions = {
        style: function (geoJsonFeature) {
            console.log('style', geoJsonFeature);
            return {};
        },
        onEachFeature: function (feature, layer) {
            console.log('onEachFeature', feature, layer);
        },
    };

    let leafletMap;

    onMount(() => {
        //leafletMap.getMap().fitBounds([[1.266835, 103.796403], [1.232988, 103.854861]]);
        // leafletMap.getMap().fitBounds([[-2.3501,52.3483], [-0.8312,53.1582]]);
    });

</script>

<div width="900" height="380">
    <div class="rideMap" style="width: 100%; height: 100%;">
        leaflet
        <!-- <LeafletMap bind:this={leafletMap} options={mapOptions}>
            <TileLayer url={tileUrl} options={tileLayerOptions}/>
            <GeoJSON url="example.geojson" options={geoJsonOptions}/>
        </LeafletMap> -->
    </div>
</div>

<style>
</style>
