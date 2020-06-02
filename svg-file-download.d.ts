declare module 'svg-file-download' {
  export default function fileDownload(
    data: string | Element,
    trim?: integer,
    filename?: string
  ): void;
}
