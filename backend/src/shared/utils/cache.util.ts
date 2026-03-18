export const bufferCheck = (input: string | Buffer): string => {
  return Buffer.isBuffer(input) ? input.toString("utf8") : input;
};