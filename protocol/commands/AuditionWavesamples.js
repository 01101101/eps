import * as reader from '../reader.js';
import * as writer from '../writer.js';

const AuditionWavesamples = (oldInstrumentNumber, oldLayerNumber, oldWavesampleNumber, newInstrumentNumber, newLayerNumber, newWavesampleNumber) => {
  return { oldInstrumentNumber, oldLayerNumber, oldWavesampleNumber, newInstrumentNumber, newLayerNumber, newWavesampleNumber, bytes: [
    writer.word12(oldInstrumentNumber), 
    writer.word12(oldLayerNumber), 
    writer.word12(oldWavesampleNumber), 
    writer.word12(newInstrumentNumber), 
    writer.word12(newLayerNumber), 
    writer.word12(newWavesampleNumber),
 ]};
};

AuditionWavesamples.code = 0x29;

AuditionWavesamples.fromBytes = (bytes) => {
  return AuditionWavesamples(reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12());
};

export { AuditionWavesamples };
