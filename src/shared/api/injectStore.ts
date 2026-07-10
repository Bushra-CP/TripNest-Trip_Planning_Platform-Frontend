import type { AppDispatch, RootState } from "../../app/store";

export type StoreType = {
  getState: () => RootState;
  dispatch: AppDispatch;
};

let store: StoreType;

export const injectStore = (_store: StoreType) => {
  store = _store;
};

export const getStore = (): StoreType => {
  if (!store) {
    throw new Error(
      "Redux store has not been injected. Call injectStore(store) during app initialization.",
    );
  }
  return store;
};
