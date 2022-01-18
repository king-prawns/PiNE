interface IClient {
  open: () => Promise<void>;
  close: () => Promise<void>;
}

export default IClient;
