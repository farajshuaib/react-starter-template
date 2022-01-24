/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useAppSelector } from "../../../store";
import { addInvoice } from "../../../store/actions/invoice";
import { addInvoiceSchema } from "../../../services/validation";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  InvoiceItemForm,
  InvoiceItemTable,
  LoadingScreen,
  Modal,
} from "../../../components";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../services/API";

import {
  medicines,
  warehouse,
  supplier,
  invoice_form,
  invoice_item_form,
} from "../../../types";

const initVals = {
  number: "",
  date: new Date(),
  warehouse_id: { id: "", name: "" },
  supplier_id: { id: "", name: "" },
  invoice_items: [],
};

const AddInvoice: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const suppliers: supplier[] = useAppSelector(
    (state) => state.global.suppliers
  );
  const warehouses: warehouse[] = useAppSelector(
    (state) => state.global.warehouses
  );
  const medicines: medicines[] = useAppSelector(
    (state) => state.global.medicines
  );

  const [editInvoiceMedicine, setEditInvoiceMedicine] =
    useState<invoice_item_form | null>(null);
  const [deleteMedicineModal, setDeleteMedicineModal] =
    useState<null | invoice_item_form>(null);
  const [initalFormValues, setInitalFormValues] =
    useState<invoice_form>(initVals);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>("");

  const getData = async () => {
    if (!params.id) {
      navigate("/");
      return;
    }
    try {
      const { data } = await API.getSpecificInvoice(+params.id);
      setInitalFormValues({
        number: data.data.number,
        date: moment(data.data.date).toDate(),
        warehouse_id: data.data.warehouse,
        supplier_id: data.data.supplier,
        invoice_items: data.data.items.map((item: any) => {
          return {
            id: item.id,
            medicine_name: medicines.find((medicine: any) => {
              return medicine.barcodes.find(
                (barcode: any) => barcode.code === item.barcode.code
              );
            }),
            barcode_id: item.barcode,
            batch_number: item.batch_number,
            quantity: item.quantity,
            selling_price: item.selling_price,
            purchasing_price: item.purchasing_price,
            expiry_date: item.expiry_date,
          };
        }),
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1 className="text-xl">
        {params.id ? "تعديل الفاتورة" : "إضافة فاتورة"}
      </h1>
      <div className="bg-white p-5 rounded-md my-5">
        <Formik
          initialValues={initalFormValues}
          enableReinitialize
          validationSchema={addInvoiceSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const props = {
              number: `${values.number}`,
              date: moment(values.date).format("YYYY-MM-DD"),
              warehouse_id: values.warehouse_id.id,
              supplier_id: values.supplier_id.id,
              invoice_items: values.invoice_items.map((item: any) => {
                return {
                  id: params.id && item.id,
                  barcode_id: item.barcode_id.id,
                  batch_number: `${item.batch_number}`,
                  quantity: `${item.quantity}`,
                  purchasing_price: `${item.purchasing_price}`,
                  selling_price: `${item.selling_price}`,
                  expiry_date: moment(item.expiry_date).format("YYYY-MM-DD"),
                };
              }),
            };
            try {
              if (params.id) {
                await API.editInvoice(params.id, { ...props, _method: "put" });
              } else {
                await addInvoice(props);
              }
              setSubmitting(false);
              setInitalFormValues(initVals);
              resetForm();
              if (params.id) {
                toast.success("تم التعديل بنجاح");
                navigate("/invoices");
              } else {
                toast.success("تم إضافة الفاتورة بنجاح");
              }
            } catch (error: any) {
              if (error.response.data.error) {
                setError(error.response.data.error);
              } else {
                setError("حدث خطأ ما الرجاء إعادة المحاولة لاحقا");
              }
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleBlur,
            handleChange,
            setFieldValue,
            isSubmitting,
          }) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/*  */}
              <div>
                <label htmlFor="warehouse" className="input-lable">
                  المخزن
                </label>
                <Select
                  value={values.warehouse_id}
                  placeholder="مخزن الإيدز والوباء الكبدي"
                  id="warehouse"
                  isRtl={true}
                  onChange={(selectedOption) =>
                    setFieldValue("warehouse_id", selectedOption)
                  }
                  getOptionValue={(option: warehouse) => option.id}
                  getOptionLabel={(option: warehouse) => option.name}
                  options={warehouses}
                />
                {!!touched.warehouse_id && !!errors.warehouse_id && (
                  <p className="error-text">
                    {errors.warehouse_id && `${errors.warehouse_id.id}`}
                  </p>
                )}
              </div>
              {/*  */}
              <div>
                <label htmlFor="number" className="input-lable">
                  رقم الفاتورة
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="ادخل رقم الفاتورة"
                  value={values.number}
                  onChange={handleChange("number")}
                  onBlur={handleBlur("number")}
                />
                {!!touched.number && !!errors.number && (
                  <p className="error-text">{errors.number.toString()}</p>
                )}
              </div>
              {/*  */}
              <div className="">
                <label htmlFor="suppliers" className="input-lable">
                  اسم المورد
                </label>
                <Select
                  value={values.supplier_id}
                  placeholder="UNICEF LIBYA"
                  id="suppliers"
                  isRtl={true}
                  onChange={(selectedOption) =>
                    setFieldValue("supplier_id", selectedOption)
                  }
                  getOptionValue={(option: supplier) => option.id}
                  getOptionLabel={(option: supplier) => option.name}
                  options={suppliers}
                />
                {!!touched.supplier_id && !!errors.supplier_id && (
                  <p className="error-text">
                    {errors.supplier_id && `${errors.supplier_id.id}`}
                  </p>
                )}
              </div>
              {/*  */}
              <div>
                <label htmlFor="number" className="input-lable">
                  تاريخ اصدار الفاتورة
                </label>
                <DatePicker
                  selected={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  onBlur={handleBlur("date")}
                  className="input"
                />
                {!!touched.date && !!errors.date && (
                  <p className="error-text">{errors.date}</p>
                )}
              </div>
              {/*  */}
              <div className="md:col-span-3">
                <h3 className="input-lable text-2xl mb-5">الاصناف</h3>
                <InvoiceItemForm
                  setValue={(val: invoice_item_form[]) => {
                    setFieldValue("invoice_items", val);
                    setEditInvoiceMedicine(null);
                  }}
                  values={values}
                  initalInvoiceMedicine={editInvoiceMedicine}
                />
                {!!touched.invoice_items && !!errors.invoice_items && (
                  <p className="error-text text-lg">
                    {errors.invoice_items.toString()}
                  </p>
                )}
              </div>
              {/* table */}

              <InvoiceItemTable
                values={values.invoice_items}
                deleteItem={(selectedItem: invoice_item_form) => {
                  setDeleteMedicineModal(selectedItem);
                }}
                setEditItem={(invoiceMedicine: invoice_item_form) =>
                  setEditInvoiceMedicine({
                    ...invoiceMedicine,
                    expiry_date: moment(invoiceMedicine.expiry_date).toDate(),
                  })
                }
              />

              {!!deleteMedicineModal && (
                <Modal
                  isVisible={!!deleteMedicineModal}
                  close={() => setDeleteMedicineModal(null)}
                >
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="p-8 flex items-center">
                      <div className="bg-red-50 h-16 w-16 rounded-full flex items-center justify-center">
                        <i className="bx bx-trash text-3xl text-red-600"></i>
                      </div>
                      <div className="mx-5">
                        <h4 className="text-3xl text-gray800">
                          الصنف سيتم{" "}
                          {deleteMedicineModal?.medicine_name?.scientific_name}{" "}
                          سيتم خدفه
                        </h4>
                        <p className="text-lg text-gray700">
                          هل انت متأكد من حذف هذا الصنف من الفاتورة
                        </p>
                      </div>
                    </div>
                    <div className="p-5 bg-gray50 flex items-center justify-end">
                      <button
                        onClick={() => {
                          let newVal = values.invoice_items?.filter(
                            (item: invoice_item_form) =>
                              item?.id !== deleteMedicineModal?.id
                          );
                          setFieldValue("invoice_items", newVal);
                          setDeleteMedicineModal(null);
                        }}
                        className="btn-primary bg-red-600 border border-red-600 py-3 mx-5 px-8"
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => setDeleteMedicineModal(null)}
                        className="btn-primary py-3 px-8 bg-transparent text-gray800 border border-gray700"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                </Modal>
              )}

              {/*  */}
              <div className="md:col-span-3">
                {!!error && <p className="error-alert">{error}</p>}
                <div className="flex  items-center">
                  <button
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                    }}
                    disabled={isSubmitting}
                    className="btn-primary flex items-center justify-center px-8 bg-success text-xl"
                  >
                    {isSubmitting ? (
                      <i className="bx bx-loader-alt bx-spin text-xl"></i>
                    ) : (
                      <>
                        <span className="ml-1">حفظ </span>
                        <i className="bx bx-save"></i>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setInitalFormValues(initVals);
                      navigate("/invoices");
                    }}
                    className="mx-5 px-8"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
     
    </div>
  );
};

export default AddInvoice;
