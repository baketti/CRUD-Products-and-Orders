import { Product, getAllProductsIds } from "@/db/models/Product";
import { UserInfo } from "@/lib/interfaces";

type GlobalStoreData = number[] | string | UserInfo;

//SINGLETON CLASS TO STORE GLOBAL DATA
class GlobalDataStore {
  private static instance: GlobalDataStore;
  private data: Map<string, GlobalStoreData>;

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

const globalStore = GlobalDataStore.getInstance(); 

async function initGlobalStore() {
  //GLOBAL STORE INITIALIZATION AND ID OF ALL PRODUCTS INJECTION
  const productsIds = await getAllProductsIds();
  globalStore.setData('productsIds', productsIds);
}

function addProductIdToGlobalStore(product: Product){
  const new_id = product.getDataValue('id');
  const productsIds = globalStore.getData('productsIds');
  globalStore.setData('productsIds',[...productsIds,new_id]);
}

export { globalStore, initGlobalStore, addProductIdToGlobalStore }