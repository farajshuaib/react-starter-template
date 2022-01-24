/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store";
import { getInvoices } from "../../../store/actions/invoice";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { LoadingScreen, Pagination, Table, Filter } from "../../../components";
import { downloadExcelFile } from "../../../utils";

import { invoices, meta } from "../../../types";

const Invoices: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [invoices, setInvoices] = useState<invoices[]>([]);
  const [meta, setMeta] = useState<meta>();
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [menu, setMenu] = useState<number | null>(null);
  const [filterMenu, setFilterMenu] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const { data, meta }: any = await dispatch(getInvoices(page, query));
      setInvoices(data);
      setMeta(meta);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page, query]);

  const exportExcel = async () => {
    await downloadExcelFile("invoices/export", "invoices");
  };

  return (
    <div className=" w-full">
      <h1 className="text-xl">قائمة الفواتير الواردة</h1>
      <div className=" flex flex-wrap md:flex-nowrap items-center justify-between">
        <button
          onClick={() => setFilterMenu(!filterMenu)}
          className="btn-primary  bg-white text-gray700 flex items-center justify-center"
        >
          <span className="">فرز</span>
          <i className="bx bx-filter-alt text-xl mr-5"></i>
        </button>
        <div className="flex items-center my-5">
          <button
            onClick={() => navigate("/invoices/add-incoming-invoice")}
            className="btn-primary ml-3 bg-secondary"
          >
            <span className="ml-1">فاتورة جديدة</span>
            <i className="bx bxs-edit"></i>
          </button>
          <button
            onClick={exportExcel}
            className="btn-primary bg-white text-success"
          >
            <span className="ml-1">تصدير</span>
            <i className="bx bx-archive-in"></i>
          </button>
        </div>
      </div>
      {filterMenu && <Filter setQuery={(val: string) => setQuery(val)} />}
      {loading ? (
        <LoadingScreen />
      ) : (
        <section className="w-full ">
          <div className="">
            {invoices.length > 0 ? (
              <>
                <Table
                  th={[
                    "رقم الفاتورة",
                    " المخزن",
                    "اسم المورد",
                    "المستخدم",
                    "التاريخ",
                    "خيارات",
                  ]}
                >
                  {invoices.map((invoice: invoices, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-gray100 even:bg-gray50"
                    >
                      <td className="px-6 py-3 whitespace-nowrap">
                        {invoice?.number}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {invoice.warehouse?.name}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {invoice.supplier?.name}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {invoice?.user?.name}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {moment(invoice.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="px-6 py-3 relative whitespace-nowrap">
                        <button
                          onClick={() => {
                            !!(menu === index) ? setMenu(null) : setMenu(index);
                          }}
                        >
                          <i className="bx bx-dots-vertical-rounded text-xl"></i>
                        </button>
                        {!!(menu === index) ? (
                          <ul className="bg-white z-20 absolute shadow-sm rounded-md px-2">
                            <li
                              className="py-2 px-5 cursor-pointer"
                              onClick={() =>
                                navigate(`/invoices/incoming/${invoice.id}`)
                              }
                            >
                              عرض
                            </li>
                            <li
                              className="py-2 px-5 cursor-pointer text-red-600"
                              onClick={() =>
                                navigate(`/edit-invoice/${invoice.id}`)
                              }
                            >
                              تعديل
                            </li>
                          </ul>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </Table>
                {!!meta && (
                  <Pagination
                    setPage={(p: number) => setPage(p)}
                    last_page={meta.last_page}
                    current_page={meta.current}
                    from={meta.from}
                  />
                )}
              </>
            ) : (
              <div>
                <h5 className="text-center my-12 text-2xl">
                  لا يوجد بيانات لعرضها
                </h5>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Invoices;
