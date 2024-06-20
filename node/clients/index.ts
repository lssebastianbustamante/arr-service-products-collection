import { IOClients } from '@vtex/api'
import CollectionClient from './collectionClient'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get collectionClient() {
    return this.getOrSet('collectionClient', CollectionClient)
  }
}
