import { count, dragEnable } from 'd3';
import Tooltip from '../components/Tooltip.svelte';

export function tooltipable(node, { data, target = document.body, foregroundColor, backgroundColor }) {
  let component;

  function handleMouseleave(e) {
    component.$destroy();
    node.removeEventListener('mouseleave', handleMouseleave)
  }

  function handleMouseenter(e) {
    const { pageX: x, pageY: y } = e;
    const { clientWidth: targetWidth, clientHeight: targetHeight } = target;

    console.log(x,y);

    //let occurencesForThisWord = everyOccurenceDataStore[].filter(occurence => occurence.word == data.displayWord);
    //console.log($everyOccurenceDataStore);

    component = new Tooltip({
      target,
      props: {
        actvityDate: data.actvityDate,
        name: data.name,
        moving_time: data.movingTime,
        distance: data.distance,
        elevationGain: data.elevationGain,
        average_speed: data.average_speed,
        x, 
        y: y + 15,
        foregroundColor,
        backgroundColor,
        targetWidth,
        targetHeight
      },
      intro: true
    });

    node.addEventListener('mouseleave', handleMouseleave)
  }

  node.addEventListener('mouseenter', handleMouseenter);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseenter);
    },
    update(data) {
      target = data.target;
      console.log("hello")
    },
  };
};
