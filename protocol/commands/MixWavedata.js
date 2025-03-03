import * as reader from '../reader.js';
import * as writer from '../writer.js';

const MixWavedata = (sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, balanceControl) => {
  return { sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, balanceControl, bytes: [
    writer.word12(sourceInstrumentNumber), 
    writer.word12(sourceLayerNumber), 
    writer.word12(sourceWavesampleNumber), 
    writer.word12(destinationInstrumentNumber), 
    writer.word12(destinationLayerNumber), 
    writer.word12(destinationWavesampleNumber), 
    writer.word12(balanceControl),
 ]};
};

MixWavedata.code = 0x45;

MixWavedata.fromBytes = (bytes) => {
  return MixWavedata(reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12());
};

export { MixWavedata };
