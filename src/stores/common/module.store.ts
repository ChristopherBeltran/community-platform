import { BehaviorSubject, Subscription } from 'rxjs'
import { Database } from '../database'

/*  The module store contains common methods used across modules that access specfic
    collections on the database
*/

export class ModuleStore {
  cacheLoaded = false
  liveLoaded = false
  allDocs$ = new BehaviorSubject<any[]>([])
  activeDoc$ = new BehaviorSubject<any>(null)
  private activeDocSub: Subscription

  // when a module store is initiated automatically load the docs in the collection
  constructor(basePath: string) {
    console.log('initiating store', basePath)
    this.getCollection(basePath)
  }

  // when accessing a collection want to call the database getCollection method which
  // efficiently checks the cache first and emits any subsequent updates
  // we will stop subscribing
  public getCollection(path: string) {
    const collection$ = Database.getCollection(path)
    collection$.subscribe(data => {
      this.allDocs$.next(data)
      if (this.cacheLoaded) {
        this.liveLoaded = true
      } else {
        this.cacheLoaded = true
      }
    })
  }

  public setActiveDoc(key: string, value: string) {
    // first emit undefined to clear any old records
    // use undefined instead of null to keep consistent with later find method
    this.activeDoc$.next(undefined)
    if (this.activeDocSub) {
      this.activeDocSub.unsubscribe()
    }
    this.activeDocSub = this.allDocs$.subscribe(docs => {
      const doc = docs.find(d => d[key] === value)
      this.activeDoc$.next(doc)
    })
  }
}
