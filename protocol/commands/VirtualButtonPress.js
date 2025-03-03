import * as reader from '../reader.js';
import * as writer from '../writer.js';

const VirtualButtonPress = (buttonNumber) => {
  return { buttonNumber, bytes: [
    writer.word12(buttonNumber),
 ]};
};

VirtualButtonPress.code = 0x64;

VirtualButtonPress.fromBytes = (bytes) => {
  return VirtualButtonPress(reader.word12());
};

export { VirtualButtonPress };
