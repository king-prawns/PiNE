import React from 'react';

import Cone from '../Cone';
import EPlayerState from '../shared/enum/EPlayerState';
import IBufferInfo from '../shared/interfaces/IBufferInfo';
import IHttpRequest from '../shared/interfaces/IHttpRequest';
import IHttpResponse from '../shared/interfaces/IHttpResponse';
import IPlayerMetadata from '../shared/interfaces/IPlayerMetadata';

type IProps = Record<string, never>;
type IState = {
  playerMetadata: IPlayerMetadata | null;
  manifestUrl: string | null;
  playerState: EPlayerState | null;
  variant: number | null;
  estimatedBandwidth: number | null;
  bufferInfo: IBufferInfo | null;
  usedJSHeapSize: number | null;
  httpRequest: IHttpRequest | null;
  httpResponse: IHttpResponse | null;
};

const PLAYBACK_DURATION: number = 60000;

class Sandbox extends React.Component<IProps, IState> {
  private playerMetadataInterval = 0;
  private manifestInterval = 0;
  private playerStateInterval = 0;
  private playerStateTimeout = 0;
  private variantInterval = 0;
  private estimatedBandwidthInterval = 0;
  private bufferInfoInterval = 0;
  private usedJSHeapSizeInterval = 0;
  private httpRequestInterval = 0;
  private httpResponseInterval = 0;

  constructor(props: IProps) {
    super(props);
    this.state = {
      playerMetadata: null,
      manifestUrl: null,
      playerState: null,
      variant: null,
      estimatedBandwidth: null,
      bufferInfo: null,
      usedJSHeapSize: null,
      httpRequest: null,
      httpResponse: null
    };
  }

  componentDidMount(): void {
    this.setState({
      playerMetadata: {
        name: 'Sanbox Shaka Player',
        version: '1.0.0'
      }
    });

    this.manifestInterval = window.setInterval(() => {
      this.setState({
        manifestUrl: this.getRandomItem<string>([
          'manifest1.mpd',
          'manifest2.mpd',
          'manifest3.mpd'
        ])
      });
    }, 3000);

    this.setState({
      playerState: EPlayerState.LOADING
    });
    this.playerStateInterval = window.setInterval(() => {
      this.setState({
        playerState: this.getRandomItem<EPlayerState>([
          EPlayerState.PLAYING,
          EPlayerState.PAUSED,
          EPlayerState.BUFFERING
        ])
      });
    }, 7000);
    this.playerStateTimeout = window.setTimeout(() => {
      this.setState({
        playerState: EPlayerState.ENDED
      });
      window.clearInterval(this.playerStateInterval);
    }, PLAYBACK_DURATION);

    this.variantInterval = window.setInterval(() => {
      this.setState({
        variant: Math.floor(Math.random() * 100)
      });
    }, 5000);

    this.estimatedBandwidthInterval = window.setInterval(() => {
      this.setState({
        estimatedBandwidth: Math.floor(Math.random() * 100)
      });
    }, 8000);

    this.bufferInfoInterval = window.setInterval(() => {
      this.setState({
        bufferInfo: {
          audio: Math.floor(Math.random() * 10),
          video: Math.floor(Math.random() * 10)
        }
      });
    }, 2500);

    this.usedJSHeapSizeInterval = window.setInterval(() => {
      this.setState({
        usedJSHeapSize: Math.floor(Math.random() * 100000)
      });
    }, 1500);

    this.httpRequestInterval = window.setInterval(() => {
      this.setState({
        httpRequest: this.getRandomItem<IHttpRequest>([
          'http://example.com/1',
          'http://example.com/2',
          'http://example.com/3',
          'http://example.com/4'
        ])
      });
    }, 1000);

    this.httpResponseInterval = window.setInterval(() => {
      this.setState({
        httpResponse: this.getRandomItem<IHttpResponse>([
          {
            url: 'http://example.com/1',
            byteLength: 11111,
            timeMs: 100
          },
          {
            url: 'http://example.com/2',
            byteLength: 22222,
            timeMs: 200
          },
          {
            url: 'http://example.com/3',
            byteLength: 33333,
            timeMs: 300
          },
          {
            url: 'http://example.com/4',
            byteLength: 44444,
            timeMs: 400
          }
        ])
      });
    }, 1500);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.playerMetadataInterval);
    window.clearInterval(this.manifestInterval);
    window.clearInterval(this.playerStateInterval);
    window.clearInterval(this.variantInterval);
    window.clearTimeout(this.playerStateTimeout);
    window.clearInterval(this.estimatedBandwidthInterval);
    window.clearInterval(this.bufferInfoInterval);
    window.clearInterval(this.usedJSHeapSizeInterval);
    window.clearInterval(this.httpRequestInterval);
    window.clearInterval(this.httpResponseInterval);
  }

  private getRandomItem<T>(items: Array<T>): T {
    const randomIndex: number = Math.floor(Math.random() * items.length);

    return items[randomIndex];
  }

  render(): JSX.Element {
    return (
      <>
        <h1>Sandbox</h1>
        <Cone
          playerMetadata={this.state.playerMetadata}
          manifestUrl={this.state.manifestUrl}
          playerState={this.state.playerState}
          variant={this.state.variant}
          estimatedBandwidth={this.state.estimatedBandwidth}
          bufferInfo={this.state.bufferInfo}
          usedJSHeapSize={this.state.usedJSHeapSize}
          httpRequest={this.state.httpRequest}
          httpResponse={this.state.httpResponse}
        />
      </>
    );
  }
}

export default Sandbox;
