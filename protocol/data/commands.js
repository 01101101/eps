import buttonNumbers from "./buttonNumbers.js";
import parameterNumbers from "./parameterNumbers.js";
import statusCodes from "./statusCodes.js";

export default {
  0x01: {
    name: 'RESPONSE',
    parameters: [
        { name: 'Status Code', format: 'word12', table: statusCodes },
    ],
  },
  0x02: {
    name: 'CANCEL',
    parameters: [],
  },
  0x03: {
    name: 'GET INSTRUMENT',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x04: {
    name: 'GET LAYER',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x05: {
    name: 'GET WAVESAMPLE PARAMETERS',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x06: {
    name: 'GET WAVESAMPLE DATA',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
    ],
  },
  0x07: {
    name: 'GET PITCH TABLE',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x08: {
    name: 'GET PARAMETER',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Parameter number', format: 'word12', table: parameterNumbers },
    ],
  },
  0x0a: {
    name: 'GET WAVESAMPLE OVERVIEW',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
    ],
  },
  0x0c: {
    name: 'PUT INSTRUMENT',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x0d: {
    name: 'PUT LAYER',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x0e: {
    name: 'PUT WAVESAMPLE PARAMETERS',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x0f: {
    name: 'PUT WAVESAMPLE DATA',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
    ],
  },
  0x10: {
    name: 'PUT PITCH TABLE',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x11: {
    name: 'PUT PARAMETER',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Parameter number', format: 'word12', table: parameterNumbers },
      { name: 'Parameter value', format: 'word24' },
    ],
  },
  0x12: {
    name: 'COPY INSTRUMENT',
    parameters: [
      { name: 'Source Instrument number', format: 'word12' },
      { name: 'Source Layer number', format: 'word12' },
      { name: 'Source Wavesample number', format: 'word12' },
      { name: 'Destination instrument number', format: 'word12' },
      { name: 'Destination layer number', format: 'word12' },
    ],
  },
  0x13: {
    name: 'PUT WAVESAMPLE OVERVIEW',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
    ],
  },
  0x15: {
    name: 'CREATE INSTRUMENT',
    parameters: [
      { name: 'New Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x16: {
    name: 'CREATE LAYER',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'New Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x17: {
    name: 'DELETE LAYER',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x18: {
    name: 'COPY LAYER',
    parameters: [
      { name: 'Source Instrument number', format: 'word12' },
      { name: 'Source Layer number', format: 'word12' },
      { name: 'Source Wavesample number', format: 'word12' },
      { name: 'Destination instrument number', format: 'word12' },
      { name: 'Destination layer number', format: 'word12' },
      { name: 'Copy data flag', format: 'word12' },
    ],
  },
  0x19: {
    name: 'CREATE WAVESAMPLE',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'New Wavesample number', format: 'word12' },
    ],
  },
  0x1a: {
    name: 'DELETE WAVESAMPLE',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x1b: {
    name: 'COPY WAVESAMPLE',
    parameters: [
      { name: 'Source Instrument number', format: 'word12' },
      { name: 'Source Layer number', format: 'word12' },
      { name: 'Source Wavesample number', format: 'word12' },
      { name: 'Destination instrument number', format: 'word12' },
      { name: 'Destination layer number', format: 'word12' },
      { name: 'Destination wavesample number', format: 'word12' },
      { name: 'Copy data flag', format: 'word12' },
    ],
  },
  0x1c: {
    name: 'DELETE INSTRUMENT',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x1d: {
    name: 'AUDITION WAVESAMPLES',
    parameters: [
      { name: 'Old Instrument number', format: 'word12' },
      { name: 'Old Layer number', format: 'word12' },
      { name: 'Old Wavesample number', format: 'word12' },
      { name: 'New Instrument number', format: 'word12' },
      { name: 'New Layer number', format: 'word12' },
      { name: 'New Wavesample number', format: 'word12' },
    ],
  },
  0x1e: {
    name: 'TRUNCATE WAVESAMPLE',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x1f: {
    name: 'CLEAR WAVEDATA',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
    ],
  },

  0x20: {
    name: 'COPY WAVEDATA',
    parameters: [
      { name: 'Source Instrument number', format: 'word12' },
      { name: 'Source Layer number', format: 'word12' },
      { name: 'Source Wavesample number', format: 'word12' },
      { name: 'Destination instrument number', format: 'word12' },
      { name: 'Destination layer number', format: 'word12' },
      { name: 'Destination wavesample number', format: 'word12' },
      { name: 'Source data range start offset', format: 'word20' },
      { name: 'Source data range end offset', format: 'word20' },
      { name: 'Destination data range start offset', format: 'word20' },
    ],
  },
  0x21: {
    name: 'ADD WAVEDATA',
    parameters: [
      { name: 'Source Instrument number', format: 'word12' },
      { name: 'Source Layer number', format: 'word12' },
      { name: 'Source Wavesample number', format: 'word12' },
      { name: 'Destination instrument number', format: 'word12' },
      { name: 'Destination layer number', format: 'word12' },
      { name: 'Destination wavesample number', format: 'word12' },
      { name: 'Source data range start offset', format: 'word20' },
      { name: 'Source data range end offset', format: 'word20' },
      { name: 'Destination data range start offset', format: 'word20' },
      { name: 'Clip prevention flag', format: 'word12' },
    ],
  },
  0x22: {
    name: 'SCALE WAVEDATA',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
      { name: 'Scale factor start point', format: 'word16' },
      { name: 'Scale factor end point', format: 'word16' },
      { name: 'Scale ramp depth', format: 'word12' },
    ],
  },
  0x23: {
    name: 'INVERT WAVEDATA',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
    ],
  },
  0x24: {
    name: 'REVERSE WAVEDATA',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
    ],
  },
  0x25: {
    name: 'REPLICATE WAVEDATA',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
    ],
  },
  0x26: {
    name: 'CROSS FADE LOOP',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Fade zone size', format: 'word20' },
      { name: 'Scale ramp depth', format: 'word12' },
    ],
  },
  0x27: {
    name: 'FADE IN WAVEDATA',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
      { name: 'Scale ramp depth', format: 'word12' },
    ],
  },
  0x28: {
    name: 'FADE OUT WAVEDATA',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
      { name: 'Scale ramp depth', format: 'word12' },
    ],
  },
  0x29: {
    name: 'REVERSE CROSS FADE LOOP',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Fade zone size', format: 'word20' },
      { name: 'Scale ramp depth', format: 'word12' },
    ],
  },
  0x2a: {
    name: 'ENSEMBLE CROSS FADE LOOP',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Scale ramp depth', format: 'word12' },
    ],
  },
  0x2b: {
    name: 'BOWTIE CROSS FADE LOOP',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Fade zone size', format: 'word20' },
      { name: 'Scale ramp depth', format: 'word12' },
    ],
  },
  0x2c: {
    name: 'LENGTHEN LOOP',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Fade zone size', format: 'word20' },
      { name: 'Scale ramp depth', format: 'word12' },
    ],
  },
  0x2d: {
    name: 'MIX WAVEDATA',
    parameters: [
      { name: 'Source Instrument number', format: 'word12' },
      { name: 'Source Layer number', format: 'word12' },
      { name: 'Source Wavesample number', format: 'word12' },
      { name: 'Destination instrument number', format: 'word12' },
      { name: 'Destination layer number', format: 'word12' },
      { name: 'Destination wavesample number', format: 'word12' },
      { name: 'Balance control', format: 'word12' },
    ],
  },
  0x2e: {
    name: 'MERGE/SPLICE WAVEDATA',
    parameters: [
      { name: 'Source Instrument number', format: 'word12' },
      { name: 'Source Layer number', format: 'word12' },
      { name: 'Source Wavesample number', format: 'word12' },
      { name: 'Destination instrument number', format: 'word12' },
      { name: 'Destination layer number', format: 'word12' },
      { name: 'Destination wavesample number', format: 'word12' },
      { name: 'Fade zone size', format: 'word20' },
      { name: 'Scale ramp depth', format: 'word12' },
      { name: 'Balance control', format: 'word12' },
    ],
  },
  0x2f: {
    name: 'VOLUME SMOOTHING',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Data range start offset', format: 'word20' },
      { name: 'Data range end offset', format: 'word20' },
      { name: 'Scale ramp depth', format: 'word12' },
      { name: 'Smoothness', format: 'word12' },
    ],
  },
  0x40: {
    name: 'VIRTUAL BUTTON PRESS',
    parameters: [
        { name: 'Button number', format: 'word12', table: buttonNumbers },
    ],
  },
  0x41: {
    name: 'NORMALIZE GAIN',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
    ],
  },
  0x42: {
    name: 'SYNTHESIZED LOOP',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Smoothness', format: 'word12' },
    ],
  },
  0x43: {
    name: 'BIDIRECTIONAL CROSS FADE LOOP',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Fade zone size', format: 'word20' },
      { name: 'Scale ramp depth', format: 'word12' },
    ],
  },
  0x44: {
    name: 'CREATE PRESET',
    parameters: [
      { name: 'Instrument number', format: 'word12' },
      { name: 'Layer number', format: 'word12' },
      { name: 'Wavesample number', format: 'word12' },
      { name: 'Preset number', format: 'word12' },
    ],
  },
};
