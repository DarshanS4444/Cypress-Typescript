class DataContext {
    private static instance: DataContext
    private data: Record<string, any>
  
    private constructor() {
      this.data = {}
    }
  
    public static getInstance(): DataContext {
      if (!DataContext.instance) {
        DataContext.instance = new DataContext()
      }
      return DataContext.instance
    }
  
    public setData(key: string, value: any): void {
      this.data[key] = value
    }
  
    public getData(key: string): any {
      return this.data[key]
    }
  
    public clearData(): void {
      this.data = {}
    }
  }
  
  export const dataContext = DataContext.getInstance()
  