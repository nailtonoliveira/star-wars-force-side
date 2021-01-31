import { LoadMaster } from '../usecases'

export const mockLoadMaster = (): LoadMaster.Model => ({
  name: 'Any Name'
})

export class LoadMasterSpy implements LoadMaster {
  callsCount = 0
  master: LoadMaster.Model = {
    name: 'Luke Skywalker'
  }

  async load(): Promise<LoadMaster.Model> {
    this.callsCount++
    return this.master
  }
}
