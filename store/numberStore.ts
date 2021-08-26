import create from "zustand";
import produce from 'immer'

import { NumCustomers } from '../model/NumCustomers';

interface NumCustomersState {
  numCustomers: NumCustomers;
  addCustomer: (num: number) => void;
  resetCustomers: () => void;
}

export const useCustomerNumStore = create<NumCustomersState>((set) => ({
  // initial state
  numCustomers: {
    num: 0
  },
  // methods for manipulating state
  addCustomer: (num: number) => {
    set(produce((state) => ({
      numCustomers: {
        num: state.numCustomers.num + 1
      }
    })));
  },
  resetCustomers: () => {
    set(produce((state) => ({
      numCustomers: {
        num: 0
      }
    })));
  },
}));
