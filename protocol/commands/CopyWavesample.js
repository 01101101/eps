import * as reader from '../reader.js';
import * as writer from '../writer.js';

const CopyWavesample = (sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, copyDataFlag) => {
  return { sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, copyDataFlag, bytes: [
    writer.word12(sourceInstrumentNumber), 
    writer.word12(sourceLayerNumber), 
    writer.word12(sourceWavesampleNumber), 
    writer.word12(destinationInstrumentNumber), 
    writer.word12(destinationLayerNumber), 
    writer.word12(destinationWavesampleNumber), 
    writer.word12(copyDataFlag),
 ]};
};

CopyWavesample.code = 0x27;

CopyWavesample.fromBytes = (bytes) => {
  return CopyWavesample(reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12());
};

export { CopyWavesample };
