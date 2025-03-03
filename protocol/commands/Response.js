import * as reader from '../reader.js';
import * as writer from '../writer.js';

const Response = (statusCode) => {
  return { statusCode, bytes: [
    writer.word12(statusCode),
 ]};
};

Response.code = 0x01;

Response.fromBytes = (bytes) => {
  return Response(reader.word12());
};

export { Response };
