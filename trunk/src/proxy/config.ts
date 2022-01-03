import IFilter from '../shared/interfaces/IFilter';

class Config {
  private static _filters: Array<IFilter> = [];

  public static get filters(): Array<IFilter> {
    return this._filters;
  }

  public static set filters(filters: Array<IFilter>) {
    this._filters = JSON.parse(JSON.stringify(filters));
  }
}

export default Config;
