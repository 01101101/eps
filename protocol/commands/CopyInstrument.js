import * as reader from '../reader.js';
import * as writer from '../writer.js';

const CopyInstrument = (sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber) => {
  return { sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, bytes: [
    writer.word12(sourceInstrumentNumber), 
    writer.word12(sourceLayerNumber), 
    writer.word12(sourceWavesampleNumber), 
    writer.word12(destinationInstrumentNumber), 
    writer.word12(destinationLayerNumber),
 ]};
};

CopyInstrument.code = 0x18;

CopyInstrument.fromBytes = (bytes) => {
  return CopyInstrument(reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12());
};

export { CopyInstrument };
