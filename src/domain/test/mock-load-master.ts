import { LoadMaster } from '../usecases'

export const mockLoadMaster = (): LoadMaster.Model => ({
  name: 'Any Name'
})

export class LoadMasterSpy implements LoadMaster {
  callsCount = 0
  load(): Promise<LoadMaster.Model> {
    this.callsCount++
    return null
  }
}
