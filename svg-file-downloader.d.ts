declare module 'svg-file-downloader' {
  export default function fileDownload(
    data: string | Element,
    trim?: integer,
    filename?: string
  ): void;
}
