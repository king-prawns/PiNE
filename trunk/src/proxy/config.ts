import IActiveFilter from '../shared/interfaces/IActiveFilter';

class Config {
  private static _activeFilters: Array<IActiveFilter> = [];

  public static get activeFilters(): Array<IActiveFilter> {
    return this._activeFilters;
  }

  public static set activeFilters(activeFilters: Array<IActiveFilter>) {
    this._activeFilters = JSON.parse(JSON.stringify(activeFilters));
  }
}

export default Config;
