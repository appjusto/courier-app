import { AlgoliaConfig, Environment, Fleet } from '@appjusto/types';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch/lite';

export default class AlgoliaApi {
  private client: SearchClient;
  private fleets: SearchIndex;

  constructor(config: AlgoliaConfig, env: Environment) {
    this.client = algoliasearch(config.appId, config.apiKey);
    this.fleets = this.client.initIndex(`${env}_fleets`);
  }

  searchFleets(query: string = '', page?: number, hitsPerPage: number = 10) {
    return this.fleets.search<Fleet>(query, {
      page,
      filters: 'type:public',
      hitsPerPage,
    });
  }

  clearCache() {
    return this.client.clearCache();
  }
}
