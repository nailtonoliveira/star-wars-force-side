export interface LoadMaster {
  load: () => Promise<LoadMaster.Model>
}

export namespace LoadMaster {
  export type Model = {
    name: string
  }
}
