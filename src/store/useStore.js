import { useState, useEffect } from 'react';
import useWalletStore from './useWalletStore';

const useStore = (store, callback) => {
  const result = store(callback);
  const [data, setData] = useState();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export const useWallet = () => useStore(useWalletStore, state => state) || {};
