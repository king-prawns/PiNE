import parser, {j2xParser as J2XParser} from 'fast-xml-parser';

import PORT from '../shared/const/Port';
import XmlRepresentation from './interfaces/XmlRepresentation';

const toJsonOptions: Partial<parser.X2jOptions> = {
  attributeNamePrefix: '@_',
  textNodeName: 'text_node',
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: false,
  parseAttributeValue: false,
  trimValues: true,
  parseTrueNumberOnly: false,
  arrayMode: true
};

const toXmlOptions: Partial<parser.J2xOptions> = {
  attributeNamePrefix: '@_',
  textNodeName: 'text_node',
  ignoreAttributes: false,
  format: false,
  indentBy: '   ',
  supressEmptyNode: true
};

const xmlDeclaration: string = '<?xml version="1.0" encoding="utf-8"?>\n';

const changeManifestToUseProxy = (
  manifest: string,
  manifestUrl: string,
  proxyUrl: string
): string => {
  const traversalObj: any = parser.getTraversalObj(manifest, toJsonOptions);
  const manifestXmlRepresentation: XmlRepresentation = parser.convertToJson(
    traversalObj,
    toJsonOptions
  );

  const originUrl: string = getUrlWithoutLastSegment(manifestUrl);

  const recursiveUpdateManifest = (
    manifest: XmlRepresentation,
    baseUrl: string
  ): XmlRepresentation => {
    Object.keys(manifest).forEach((key: string) => {
      if (Array.isArray(manifest[key])) {
        (manifest[key] as Array<XmlRepresentation>).forEach(
          (p: XmlRepresentation) => {
            recursiveUpdateManifest(p, baseUrl);
          }
        );
      } else {
        switch (key) {
          case 'BaseURL':
            baseUrl = baseUrl + manifest[key] || '';
            delete manifest[key];
            break;
          case '@_initialization':
          case '@_media':
            manifest[key] = changeUrl(
              proxyUrl,
              originUrl,
              baseUrl,
              manifest[key] as string
            );
            break;
        }
      }
    });

    return manifest;
  };

  const adjustedManifest: XmlRepresentation = recursiveUpdateManifest(
    manifestXmlRepresentation,
    ''
  );

  const j2xParser: parser.j2xParser = new J2XParser(toXmlOptions);

  return `${xmlDeclaration}${j2xParser.parse(adjustedManifest)}`;
};

const getUrlWithoutLastSegment = (url: string): string => {
  return url.slice(0, url.lastIndexOf('/'));
};

const getFileExtension = (url: string): string => {
  return url.split('.').pop() || '';
};

const changeUrl = (
  proxyUrl: string,
  originUrl: string,
  baseUrl: string,
  originalValue: string
): string => {
  const fileExtension: string = getFileExtension(originalValue);
  const absoluteUrl: string = `${originUrl}/${baseUrl}${originalValue}`;

  return `${proxyUrl}:${PORT.TRUNK}/chunk/pine.${fileExtension}?url=${absoluteUrl}`;
};

export default changeManifestToUseProxy;
