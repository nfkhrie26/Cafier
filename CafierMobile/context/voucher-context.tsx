import React, { createContext, useContext, useState } from 'react';
import { View } from 'react-native'; // <--- FIX: Tambahin import View

export type Voucher = {
  id: number;
  title: string;
  desc: string;
};

type VoucherContextType = {
  claimedVoucherIds: number[]; // Buat ngecek status (udah diclaim atau belum)
  claimedVouchers: Voucher[];   // Buat nampilin list di halaman Voucher
  claimVoucher: (id: number) => void;
  availableVouchers: Voucher[];
};

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

const MASTER_VOUCHERS: Voucher[] = [
  {
    id: 1,
    title: "Monthly Rewards",
    desc: "Enjoy a free Iced Americano at the start of every month!",
  },
  {
    id: 2,
    title: "Weekly Rewards",
    desc: "Enjoy 15% discount every week to grab your favorite menu for less!",
  }
];

export function VoucherProvider({ children }: { children: React.ReactNode }) {
  const [claimedVoucherIds, setClaimedVoucherIds] = useState<number[]>([]);

  // Otomatis bikin list objek voucher berdasarkan ID yang udah di-claim
  const claimedVouchers = MASTER_VOUCHERS.filter(v => 
    claimedVoucherIds.includes(v.id)
  );

  const claimVoucher = (id: number) => {
    if (!claimedVoucherIds.includes(id)) {
      setClaimedVoucherIds((prev) => [...prev, id]);
    }
  };

  return (
    // Style flex: 1 biar gak ngerusak layout
    <View style={{ flex: 1 }}>
      <VoucherContext.Provider 
        value={{ 
          claimedVoucherIds, 
          claimedVouchers, // Sekarang ini udah ada datanya!
          claimVoucher, 
          availableVouchers: MASTER_VOUCHERS 
        }}
      >
        {children}
      </VoucherContext.Provider>
    </View>
  );
}

export function useVouchers() {
  const context = useContext(VoucherContext);
  if (!context) throw new Error('useVouchers must be used within VoucherProvider');
  return context;
}