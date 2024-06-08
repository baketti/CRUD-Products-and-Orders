// GlobalDataStore.ts
class GlobalDataStore {
    private static instance: GlobalDataStore;
    private data: Map<string, any>;
  
    private constructor() {
      this.data = new Map();
    }
  
    public static getInstance(): GlobalDataStore {
      if (!GlobalDataStore.instance) {
        GlobalDataStore.instance = new GlobalDataStore();
      }
      return GlobalDataStore.instance;
    }
  
    setData(key: string, value: any) {
      this.data.set(key, value);
    }
  
    getData(key: string): any {
      return this.data.get(key);
    }
  }
  
  export default GlobalDataStore;

  /* import GlobalDataStore from './GlobalDataStore';

const store = GlobalDataStore.getInstance();
store.setData('key', 'value');

// Later in the application
const value = store.getData('key'); */