import IDuration from '../shared/interfaces/IDuration';
import IEstimatedBandwidthAssertion from './IEstimatedBandwidthAssertion';
import IManifestUrlAssertion from './IManifestUrlAssertion';
import IPlayerStateAssertion from './IPlayerStateAssertion';
import IVariantAssertion from './IVariantAssertion';
import IVideoBufferInfoAssertion from './IVideoBufferInfoAssertion';

type IAssertion = (
  | IPlayerStateAssertion
  | IManifestUrlAssertion
  | IVariantAssertion
  | IEstimatedBandwidthAssertion
  | IVideoBufferInfoAssertion
) &
  IDuration;

export default IAssertion;
