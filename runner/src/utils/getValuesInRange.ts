import IStat from '../shared/interfaces/IStat';
import IStats from '../shared/interfaces/IStats';

const getValuesInRange = <T>(
  stats: IStats<T>,
  fromMs: number,
  toMs: number
): Array<T> =>
  stats
    .filter((stat: IStat<T>) => stat.timeMs >= fromMs && stat.timeMs <= toMs)
    .map((stat: IStat<T>) => stat.value);

export default getValuesInRange;
