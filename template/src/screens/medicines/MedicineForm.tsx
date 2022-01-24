import React, { useState } from "react";
import { Formik } from "formik";
import { createMedicineSchema } from "../../services/validation";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import API from "../../services/API";
import { useAppSelector } from "../../store";
import { barcode } from "../../types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MedicineForm: React.FC = () => {
  const navigator = useNavigate();
  const [error, setError] = useState<string>("");

  const units = useAppSelector((state) => state.global.units);
  const manufacturers = useAppSelector((state) => state.global.manufacturers);
  const disease_types = useAppSelector((state) => state.global.disease_types);

  return (
    <div>
      <h1 className="text-xl">إضافة دواء جديد</h1>
      <div className="bg-white p-5 rounded-md my-5">
        <Formik
          initialValues={
            {
              scientific_name: "",
              temperature: "",
              humidity: "",
              minimum_order: "",
              notes: "",
              disease_type_id: "",
              unit_id: "",
              barcodes: [
                {
                  code: "",
                  brand_name: "",
                  manufacturer_id: "",
                },
              ],
            } as any
          }
          validationSchema={createMedicineSchema}
          onSubmit={async (values: any, { setSubmitting }) => {
            setError("");
            const props = {
              ...values,
              disease_type_id: values.disease_type_id.id,
              unit_id: values.unit_id.id,
              temperature: values.temperature.toString(),
              humidity: values.humidity.toString(),
              barcodes: values.barcodes.map((item: any) => {
                return {
                  ...item,
                  code: `${item.code}`,
                  manufacturer_id: item.manufacturer_id.id,
                };
              }),
            };
            try {
              await API.createNewMedicine(props);
              setSubmitting(false);
              navigator("/medicines");
              toast.success("تم اضافة الدواء بنجاح");
            } catch (erorr: any) {
              setError(erorr.response.data.error);
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            values,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
            isSubmitting,
          }: any) => (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/*  */}
                <div>
                  <label htmlFor="scientific_name" className="input-lable">
                    الإسم العلمي
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="ادخل الاسم العلمي للدواء"
                    value={values.scientific_name}
                    onChange={handleChange("scientific_name")}
                    onBlur={handleBlur("scientific_name")}
                  />
                  {!!touched.scientific_name && !!errors.scientific_name && (
                    <p className="error-text">
                      {errors.scientific_name && `${errors.scientific_name}`}
                    </p>
                  )}
                </div>
                {/*  */}
                <div>
                  <label htmlFor="temperature" className="input-lable">
                    درجة حرارة التخزين
                  </label>
                  <input
                    type="number"
                    className="input"
                    id="temperature"
                    name="temperature"
                    placeholder="ادخل درجة الحرارة المناسبة لتخزين الدواء"
                    value={values.temperature}
                    onChange={handleChange("temperature")}
                    onBlur={handleBlur("temperature")}
                  />
                  {!!touched.temperature && !!errors.temperature && (
                    <p className="error-text">
                      {errors.temperature && `${errors.temperature}`}
                    </p>
                  )}
                </div>
                {/*  */}
                <div>
                  <label htmlFor="humidity" className="input-lable">
                    درجة رطوبة التخزين
                  </label>
                  <input
                    type="number"
                    className="input"
                    id="humidity"
                    name="humidity"
                    placeholder="ادخل درجة الرطوبة المناسبة لتخزين الدواء"
                    value={values.humidity}
                    onChange={handleChange("humidity")}
                    onBlur={handleBlur("humidity")}
                  />
                  {!!touched.humidity && !!errors.humidity && (
                    <p className="error-text">
                      {errors.humidity && `${errors.humidity}`}
                    </p>
                  )}
                </div>

                {/*  */}
                <div>
                  <label htmlFor="minimum_order" className="input-lable">
                    الحد الادنى للطلب
                  </label>
                  <input
                    type="number"
                    className="input"
                    id="minimum_order"
                    name="minimum_order"
                    placeholder="ادخل الحد الادني للطلب"
                    value={values.minimum_order}
                    onChange={handleChange("minimum_order")}
                    onBlur={handleBlur("minimum_order")}
                  />
                  {!!touched.minimum_order && !!errors.minimum_order && (
                    <p className="error-text">
                      {errors.minimum_order && `${errors.minimum_order}`}
                    </p>
                  )}
                </div>
                {/*  */}
                <div>
                  <label htmlFor="disease_type_id" className="input-lable">
                    حدد نوع المرض
                  </label>
                  <Select
                    value={values.disease_type_id}
                    placeholder="حدد نوع المرض"
                    id="disease_type_id"
                    isRtl={true}
                    onChange={(selectedOption) =>
                      setFieldValue("disease_type_id", selectedOption)
                    }
                    getOptionValue={(option: any) => option.id}
                    getOptionLabel={(option: any) => option.name}
                    options={disease_types}
                  />
                  {!!touched.disease_type_id && !!errors.disease_type_id && (
                    <p className="error-text">
                      {errors.disease_type_id.name &&
                        `${errors.disease_type_id.name}`}
                    </p>
                  )}
                </div>
                {/*  */}
                <div>
                  <label htmlFor="unit_id" className="input-lable">
                    الوحدة
                  </label>
                  <Select
                    value={values.unit_id}
                    placeholder="حدد الوحدة"
                    id="unit_id"
                    isRtl={true}
                    onChange={(selectedOption) =>
                      setFieldValue("unit_id", selectedOption)
                    }
                    getOptionValue={(option: any) => option.id}
                    getOptionLabel={(option: any) => option.name}
                    options={units}
                  />
                  {!!touched.unit_id && !!errors.unit_id && (
                    <p className="error-text">
                      {errors.unit_id.name && `${errors.unit_id.name}`}
                    </p>
                  )}
                </div>
                {/*  */}
                <div>
                  <label htmlFor="code" className="input-lable">
                    الباركود
                  </label>
                  <input
                    type="number"
                    className="input"
                    id="code"
                    name="code"
                    placeholder="barcode"
                    value={values.barcodes[0].code}
                    onChange={(e) =>
                      setFieldValue("barcodes", [
                        { ...values.barcodes[0], code: e.target.value },
                      ])
                    }
                  />
                  <div className="flex items-center text-sm text-primary font-medium tracking-wide">
                    <span> لا تملك باراكود ؟</span>
                    <button
                      onClick={() => {
                        let generatedCode = Math.floor(
                          Math.random() * 9999999999999
                        );
                        setFieldValue("barcodes", [
                          {
                            ...values.barcodes[0],
                            code: generatedCode,
                          },
                        ]);
                      }}
                      className="underline font-bold"
                    >
                      إنشاء باراكود
                    </button>
                  </div>
                  {!!touched.barcodes && !!errors.barcodes && (
                    <p className="error-text">
                      {errors.barcodes.length > 0 &&
                        `${errors.barcodes[0].code}`}
                    </p>
                  )}
                </div>
                {/*  */}
                <div>
                  <label htmlFor="brand_name" className="input-lable">
                    الإسم التجاري
                  </label>
                  <input
                    type="text"
                    className="input"
                    id="brand_name"
                    name="brand_name"
                    placeholder="ادخل الإسم التجاري"
                    value={values.barcodes[0].brand_name}
                    onChange={(e) =>
                      setFieldValue("barcodes", [
                        { ...values.barcodes[0], brand_name: e.target.value },
                      ])
                    }
                  />
                  {!!touched.barcodes && !!errors.barcodes && (
                    <p className="error-text">
                      {errors.barcodes.length > 0 &&
                        `${errors.barcodes[0]?.brand_name || ""}`}
                    </p>
                  )}
                </div>
                {/*  */}
                <div>
                  <label htmlFor="manufacturer_id" className="input-lable">
                    الشركة المصنعة
                  </label>
                  <Select
                    value={values.barcodes[0].manufacturer_id}
                    placeholder="حدد الشركة المصنعة"
                    id="manufacturer_id"
                    isRtl={true}
                    onChange={(selectedOption) =>
                      setFieldValue("barcodes", [
                        {
                          ...values.barcodes[0],
                          manufacturer_id: selectedOption,
                        },
                      ])
                    }
                    getOptionValue={(option: any) => option.id}
                    getOptionLabel={(option: any) => option.name}
                    options={manufacturers}
                  />
                  {!!touched.barcodes && !!errors.barcodes && (
                    <p className="error-text">
                      {console.log(errors.barcodes)}
                      {errors.barcodes.length > 0 &&
                        `${errors.barcodes[0]?.manufacturer_id?.name || ""}`}
                    </p>
                  )}
                </div>

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
                        resetForm();
                      }}
                      className="mx-5 px-8"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MedicineForm;
