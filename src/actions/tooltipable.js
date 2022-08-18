import { count, dragEnable } from 'd3';
import Tooltip from '../components/Tooltip.svelte';

export function tooltipable(node, { data, target = document.body, foregroundColor, backgroundColor, everyOccurence }) {
  let component;

  function handleMouseleave(e) {
    component.$destroy();
    node.removeEventListener('mouseleave', handleMouseleave)
  }

  function handleMouseenter(e) {
    const { pageX: x, pageY: y } = e;
    const { clientWidth: targetWidth, clientHeight: targetHeight } = target;

    //let occurencesForThisWord = everyOccurenceDataStore[].filter(occurence => occurence.word == data.displayWord);
    //console.log($everyOccurenceDataStore);

    component = new Tooltip({
      target,
      props: {
        word: data.word,
        displayWord: data.displayWord,
        title: data.title,
        group: data.group,
        year: data.year,
        peakYear: data.peakYear,
        count: data.count,
        allTimeCount: data.allTimeCount,
        periodCountRank: data.periodCountRank,
        wikiLink: data.wikiLink,
        imageURL: data.imageURL,
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
    },
  };
};
