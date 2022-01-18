import IStat from '../shared/interfaces/IStat';
import IStats from '../shared/interfaces/IStats';

const getValuesInRange = <T>(
  stats: IStats<T>,
  fromMs: number,
  toMs: number
): Array<T> => {
  if (stats.length === 0) {
    return [];
  }

  const statsInRange: IStats<T> = stats.filter(
    (stat: IStat<T>) => stat.timeMs >= fromMs && stat.timeMs <= toMs
  );

  if (statsInRange.length === 0) {
    const lastSeenStat: IStat<T> = stats[stats.length - 1];
    statsInRange.push(lastSeenStat);
  }

  return statsInRange.map((stat: IStat<T>) => stat.value);
};

export default getValuesInRange;
