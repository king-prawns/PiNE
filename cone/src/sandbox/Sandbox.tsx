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

const PLAYBACK_DURATION: number = 30000;

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
      this.clearIntervals();
    }, PLAYBACK_DURATION);

    this.variantInterval = window.setInterval(() => {
      this.setState({
        variant: Math.random() * 10
      });
    }, 2500);

    this.estimatedBandwidthInterval = window.setInterval(() => {
      this.setState({
        estimatedBandwidth: Math.floor(Math.random() * 25)
      });
    }, 5000);

    this.bufferInfoInterval = window.setInterval(() => {
      this.setState({
        bufferInfo: {
          audio: Math.floor(Math.random() * 40),
          video: Math.floor(Math.random() * 40)
        }
      });
    }, 2500);

    this.usedJSHeapSizeInterval = window.setInterval(() => {
      this.setState({
        usedJSHeapSize: Math.floor(Math.random() * 80)
      });
    }, 1500);

    this.httpRequestInterval = window.setInterval(() => {
      const httpRequestList: Array<IHttpRequest> = [...Array(200)].map(
        (_item: undefined, index: number) => `http://example.com/${index}`
      );
      const httpRequest: IHttpRequest =
        this.getRandomItem<IHttpRequest>(httpRequestList);
      this.setState({
        httpRequest
      });

      const timeMs: number = Math.random() * 3000;
      window.setTimeout(() => {
        this.setState({
          httpResponse: {
            url: httpRequest,
            byteLength: Math.floor(Math.random() * 1000000),
            timeMs
          }
        });
      }, timeMs);
    }, 1000);
  }

  componentWillUnmount(): void {
    this.clearIntervals();
  }

  private clearIntervals(): void {
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
