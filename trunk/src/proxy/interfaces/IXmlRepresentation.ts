interface IXmlRepresentation {
  [key: string]: Array<IXmlRepresentation> | string;
}

export default IXmlRepresentation;
