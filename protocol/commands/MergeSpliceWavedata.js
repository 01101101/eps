import * as reader from '../reader.js';
import * as writer from '../writer.js';

const MergeSpliceWavedata = (sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, fadeZoneSize, scaleRampDepth, balanceControl) => {
  return { sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, fadeZoneSize, scaleRampDepth, balanceControl, bytes: [
    writer.word12(sourceInstrumentNumber), 
    writer.word12(sourceLayerNumber), 
    writer.word12(sourceWavesampleNumber), 
    writer.word12(destinationInstrumentNumber), 
    writer.word12(destinationLayerNumber), 
    writer.word12(destinationWavesampleNumber), 
    writer.word20(fadeZoneSize), 
    writer.word12(scaleRampDepth), 
    writer.word12(balanceControl),
 ]};
};

MergeSpliceWavedata.code = 0x46;

MergeSpliceWavedata.fromBytes = (bytes) => {
  return MergeSpliceWavedata(reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word12(), reader.word12());
};

export { MergeSpliceWavedata };
