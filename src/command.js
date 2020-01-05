const sketch = require('sketch');


function setLetterSpacing(fontSize) {

  const a = -0.0223, b = 0.185, c = -0.1745;
  return parseFloat((fontSize * (a + b * Math.pow(Math.E, c * fontSize))).toFixed(2))
  
}


export default function () {

  const doc = sketch.getSelectedDocument();
  const { selectedLayers } = doc;
  let selectedCount = 0;

  if (selectedLayers.length === 0) {
    sketch.UI.message('No layers are selected.');
    return
  }

  selectedLayers.forEach(layer => {

    if (layer.type === 'Text') {

      const fontSize = layer.style.fontSize;

      if (layer.style.fontFamily === 'Inter') {

        selectedCount++;

        layer.style.kerning = setLetterSpacing(fontSize);

      }

    }

  });

  if (selectedCount === 0) {
    sketch.UI.message('Your selection does not contain any layers that use the Inter font.');
    return
  }

  sketch.UI.message(`👍 ${selectedCount} ${selectedCount === 1 ? 'layer' : 'layers'} changed!`);
  
}