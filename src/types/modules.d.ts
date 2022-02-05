declare module 'react-zlib-js' {
  function gzipSync(buf: InputType, options?: ZlibOptions): Buffer;
  function unzipSync(buf: InputType, options?: ZlibOptions): Buffer;
}
