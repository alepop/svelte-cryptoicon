exports.parseManisfest = manifest =>
  JSON.parse(manifest).reduce((acc, el) =>
    (acc[el.symbol.toLowerCase()] = el.color, acc), {})

exports.capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
exports.fixName = name => {
  switch (name) {
    case '0xbtc':
      return 'ZeroxBtc';
    case '2give':
      return 'TwoGive';
    default: return name;
  }
}

exports.patchSvgViewBox = svg => {
  const containsViewBox = svg.search('viewBox') !== -1
  if (containsViewBox) {
    return svg
  } else {
    return svg.replace("<svg", "<svg viewBox=\"0 0 32 32\"");
  }
}
