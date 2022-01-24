/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../services/API";
import { LoadingScreen, InvoiceItemTable } from "../../../components";
import moment from "moment";
import logo from "../../../assets/images/logo.png";
import { downloadExcelFile } from "../../../utils";

import { invoices } from "../../../types";

const InvoiceDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setDate] = useState<invoices>();

  const params = useParams();

  const navigate = useNavigate();

  const getData = async () => {
    if (!params.id) {
      navigate("/");
      return;
    }
    try {
      const { data } = await API.getSpecificInvoice(+params.id);
      setDate(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getData();
    } else {
      navigate("/");
    }
  }, []);

  const exportExcel = async () => {
    await downloadExcelFile(`invoices/export/${params.id}`, "invoices");
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {data ? (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-xl">طباعة فاتورة</h1>
            <button
              onClick={exportExcel}
              className="btn-primary bg-white text-success"
            >
              <span className="ml-1">تصدير</span>
              <i className="bx bx-archive-in"></i>
            </button>
          </div>
          <div className="bg-white rounded-md my-5">
            <div className="p-8">
              <img
                src={logo}
                alt=""
                className="object-cover mx-auto h-28 my-12"
              />
              <div className="grid grid-cols-2 gap-8 mb-5">
                <div className="">
                  <label className="input-label text-gray700">المخزن</label>
                  <div className="my-2 text-xl">{data.warehouse.name}</div>
                </div>
                <div className="">
                  <label className="input-label text-gray700">المستخدم</label>
                  <div className="my-2 text-xl">{data.user.name}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-8">
                <div className="">
                  <label className="input-label text-gray700">
                    رقم الفاتورة
                  </label>
                  <div className="my-2 text-xl">{data.number}</div>
                </div>
                <div className="">
                  <label className="input-label text-gray700">اسم المورد</label>
                  <div className="my-2 text-xl">{data.supplier.name}</div>
                </div>
                <div className="">
                  <label className="input-label text-gray700">
                    تاريخ الاصدار
                  </label>
                  <div className="my-2 text-xl">
                    {moment(data.created_at).format("YYYY-MM-DD")}
                  </div>
                </div>
                <div className="">
                  <label className="input-label text-gray700">
                    تاريخ الفاتورة
                  </label>
                  <div className="my-2 text-xl">
                    {moment(data.date).format("YYYY-MM-DD")}
                  </div>
                </div>
              </div>

              <InvoiceItemTable values={data.items} removeOptions />
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl text-gray800 text-center my-12">
            هذه الفاتورة غير موجودة حاليا، الرجاء إعادة المحاولة لاحقا
          </h1>
        </>
      )}
    </div>
  );
};

export default InvoiceDetails;
