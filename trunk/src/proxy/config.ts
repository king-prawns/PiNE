import IFilters from '../shared/interfaces/IFilters';

class Config {
  private static _filters: IFilters = {};

  public static get filters(): IFilters {
    return this._filters;
  }

  public static set filters(filters: IFilters) {
    this._filters = JSON.parse(JSON.stringify(filters));
  }
}

export default Config;
