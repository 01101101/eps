import * as reader from '../reader.js';
import * as writer from '../writer.js';

const CopyLayer = (sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, copyDataFlag) => {
  return { sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, copyDataFlag, bytes: [
    writer.word12(sourceInstrumentNumber), 
    writer.word12(sourceLayerNumber), 
    writer.word12(sourceWavesampleNumber), 
    writer.word12(destinationInstrumentNumber), 
    writer.word12(destinationLayerNumber), 
    writer.word12(copyDataFlag),
 ]};
};

CopyLayer.code = 0x24;

CopyLayer.fromBytes = (bytes) => {
  return CopyLayer(reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12());
};

export { CopyLayer };
