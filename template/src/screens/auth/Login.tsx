import React,{ useState } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "../../services/validation";

import {} from "../../components";
import { useAppDispatch } from "../../store";
import { login } from "../../store/actions/auth";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import banner from "../../assets/images/Banner.webp";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (
          values,
          { setSubmitting, setErrors, setFieldError }
        ) => {
          try {
            await dispatch(login(values));
            setSubmitting(false);
            navigate("/");
          } catch (err: any) {
            console.log("err.response", err.response);
            if (err.response.data.error) {
              setError(err.response.data.error);
            } else {
              setError("حدث خطأ ما الرجاء إعادة المحاولة لاحقا");
            }
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div className="flex items-center md:h-3/4 w-11/12 md:w-3/4 bg-gray100 rounded-lg shadow-sm overflow-hidden">
            <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-10 lg:p-16">
              <img
                src={logo}
                alt=""
                className="object-cover md:w-3/4 mx-auto"
              />
              <Form onSubmit={handleSubmit}>
                <div className="my-5">
                  <label htmlFor="email" className="input-lable">
                    البريد الالكتروني
                  </label>
                  <input
                    required
                    id="email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    className="input"
                  />
                  {errors.email && touched.email && (
                    <p className="error-text">{errors.email}</p>
                  )}
                </div>
                <div className="my-5">
                  <label htmlFor="password" className="input-lable">
                    كلمة المرور
                  </label>
                  <input
                    required
                    name="password"
                    type="password"
                    id="password"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    autoComplete="current-password"
                    className="input"
                  />
                  {errors.password && touched.password && (
                    <p className="error-text">
                      {errors.password}
                    </p>
                  )}
                </div>

                {!!error && <p className="error-alert">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-primary w-full rounded-lg py-3"
                >
                  {!isSubmitting ? (
                    <span>دخول</span>
                  ) : (
                    <i className="bx bx-loader-alt bx-spin"></i>
                  )}
                </button>
                <div className="mt-8 flex items-center text-center justify-center text-gray700 text-sm">
                  <p> هل نسيت كلمة المرور؟</p>
                  <button className="font-medium underline" onClick={() => {}}>
                    اضفط هنا
                  </button>
                </div>
              </Form>
            </div>
            <img
              alt=""
              src={banner}
              className="hidden md:block w-1/2 h-full object-cover"
            />
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
