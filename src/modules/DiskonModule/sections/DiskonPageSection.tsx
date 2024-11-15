"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Clock, ShoppingCart, Tag, Percent, Wallet } from "lucide-react";
import { VOUCHERS, PROMOS } from "../constant";
import { SuccessModal } from "../components/ModalSukses";
import { FailureModal } from "../components/ModalGagal";
import { formatCurrency, formatDate, calculateExpiryDate } from "../constant";
import type { VoucherProps } from "../interface";

export const DiskonPageSection = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failureModalOpen, setFailureModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherProps | null>(
    null
  );
  const [saldo, setSaldo] = useState(100000);

  const handleBuyClick = (voucher: VoucherProps) => {
    if (saldo >= voucher.harga) {
      setSaldo((prevSaldo) => prevSaldo - voucher.harga);
      setSelectedVoucher(voucher);
      setSuccessModalOpen(true);
    } else {
      setFailureModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">
            Voucher & Promo Spesial
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Temukan voucher eksklusif dan promo menarik untuk menghemat
            pembelian Anda
          </p>
          <div className="mt-4 flex items-center gap-2 bg-white p-3 rounded-lg shadow">
            <Wallet className="w-5 h-5 text-blue-900" />
            <span className="font-medium">
              Saldo Anda: {formatCurrency(saldo)}
            </span>
          </div>
        </div>

        <div className="grid gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-blue-900">
              <div className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-semibold text-white">
                  Voucher Tersedia
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {VOUCHERS.map((voucher) => (
                  <Card
                    key={voucher.kode}
                    className="border-2 hover:border-blue-900 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 border-blue-900 text-blue-900"
                        >
                          {voucher.kode}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-900"
                        >
                          <Percent className="w-4 h-4 mr-1" />
                          {voucher.potongan}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <ShoppingCart className="w-4 h-4" />
                          <span>
                            Min. Transaksi:{" "}
                            {formatCurrency(voucher.minTransaksi)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Berlaku {voucher.jumlahHariBerlaku} hari</span>
                        </div>

                        <Separator className="bg-blue-100" />

                        <div className="flex justify-between items-center">
                          <div className="text-lg font-semibold text-blue-900">
                            {formatCurrency(voucher.harga)}
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-900"
                          >
                            {voucher.kuotaPenggunaan} kali pakai
                          </Badge>
                        </div>

                        <Button
                          onClick={() => handleBuyClick(voucher)}
                          className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                          disabled={saldo < voucher.harga}
                        >
                          {saldo < voucher.harga
                            ? "Saldo Tidak Cukup"
                            : "Beli Voucher"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-blue-900">
              <div className="flex items-center gap-3">
                <Percent className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-semibold text-white">
                  Promo Berlangsung
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROMOS.map((promo) => (
                  <Card
                    key={promo.kode}
                    className="border hover:border-blue-900 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 border-blue-900 text-blue-900"
                        >
                          {promo.kode}
                        </Badge>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          Berlaku sampai {formatDate(promo.tanggalAkhirBerlaku)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedVoucher && (
        <SuccessModal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          voucherCode={selectedVoucher.kode}
          expiryDate={calculateExpiryDate(selectedVoucher.jumlahHariBerlaku)}
          quota={selectedVoucher.kuotaPenggunaan}
        />
      )}

      <FailureModal
        isOpen={failureModalOpen}
        onClose={() => setFailureModalOpen(false)}
      />
    </div>
  );
};