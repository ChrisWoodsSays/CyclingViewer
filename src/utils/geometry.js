export const polarToCartesian = (centerX, centerY, radius, angle) => {
  return {
    x: centerX + (radius * Math.cos(angle)),
    y: centerY + (radius * Math.sin(angle))
  };
};

export const margin = { top: 100, right: 50, bottom: 0, left: 50}
export const vizWidth = (width) => {
  return width - margin.left - margin.right
};
export const vizHeight = (height) => {
  return height - margin.top - margin.bottom
};
