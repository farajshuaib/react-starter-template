import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingScreen, Pagination, Table } from "../../components";
import API from "../../services/API";
import { useAppDispatch, useAppSelector } from "../../store";
import { medicines, meta } from "../../types";

const Medicines: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState<meta>();
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [menu, setMenu] = useState<number | null>(null);
  const [filterMenu, setFilterMenu] = useState<boolean>(false);

  const disease_types = useAppSelector((state) => state.global.disease_types);
  const units = useAppSelector((state) => state.global.units);

  const getData = async () => {
    setLoading(true);
    try {
      const { data, meta }: any = await API.getMedicines(page, query);
      setData(data.data);
      setMeta(meta);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page, query]);

  return (
    <div className=" w-full">
      <h1 className="text-xl">قائمة الادوية</h1>
      <div className=" flex flex-wrap md:flex-nowrap items-center justify-end">
        <div className="flex items-center my-5">
          <button
            onClick={() => navigate("/add-medicine")}
            className="btn-primary ml-3 bg-secondary"
          >
            <span className="ml-1">إضافة دواء جديد</span>
            <i className="bx bxs-edit"></i>
          </button>
        </div>
      </div>

      {/*  */}

      {loading ? (
        <LoadingScreen />
      ) : (
        <section className="w-full ">
          <div className="">
            {data.length > 0 ? (
              <>
                <Table
                  th={[
                    "الإسم العلمي",
                    " نوع المرض",
                    "درجة حرارة التخزين",
                    "درجة رطوبة التخزين",
                    "وحدة المنتج",
                    "خيارات",
                  ]}
                >
                  {data.map((medicine: medicines, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-gray100 even:bg-gray50"
                    >
                      <td className="px-6 py-3 whitespace-nowrap">
                        {medicine?.scientific_name}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {(disease_types &&
                          disease_types.length > 0 &&
                          disease_types.find(
                            (type: any) => medicine.disease_type_id === +type.id
                          )?.name) ||
                          "غير معروف"}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {medicine.temperature || "غير معروف"}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {medicine?.humidity || "غير معروف"}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {(
                          units &&
                          units.length > 0 &&
                          units.find(
                            (unit: any) => medicine.unit_id === +unit.id
                          )
                        )?.name || "غير معروف"}
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
                                navigate(`/medicine/${medicine.id}`)
                              }
                            >
                              عرض
                            </li>
                            <li
                              className="py-2 px-5 cursor-pointer text-red-600"
                              onClick={() =>
                                navigate(`/edit-medicine/${medicine.id}`)
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

export default Medicines;
