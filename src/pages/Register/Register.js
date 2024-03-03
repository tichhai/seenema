/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { dangKiAction } from "../../redux/actions/QuanLyNguoiDungAction";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { GROUPID } from "../../util/settings/config";

export default function Login(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      soDt: "",
      email: "",
      hoTen: "",
      maNhom: GROUPID,
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .min(2, t("Ít nhất 2 ký tự!"))
        .required(t("Tài khoản không được để trống!")),
      matKhau: Yup.string()
        .min(6, t("Ít nhất 6 ký tự!"))
        .required(t("Mật khẩu không được để trống!")),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("matKhau")], t("Mật khẩu không khớp!"))
        .required(t("Nhập lại mật khẩu!")),
      soDt: Yup.number()
        .typeError(t("Vui lòng chỉ nhập số!"))
        .positive(t("Chỉ nhập số dương!"))
        .integer(t("Chỉ nhập số nguyên!"))
        .min(10, t("Ít nhất 10 ký tự!"))
        .required(t("Số điện thoại không được để trống!")),
      email: Yup.string()
        .email(t("Email không hợp lệ!"))
        .required(t("Email không được để trống!")),
      hoTen: Yup.string().required(t("Họ tên không được để trống!")),
    }),
    onSubmit: (values) => {
      const action = dangKiAction(values, navigate, t);
      dispatch(action);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="lg:w-1/2 xl:max-w-screen-sm"
    >
      <div className="bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <NavLink to="/">
              <img
                src="https://static.vecteezy.com/system/resources/previews/007/414/765/original/illustration-logo-eyes-free-vector.jpg"
                alt="logo"
                width={50}
                height={50}
              />
            </NavLink>
          </div>
          <NavLink
            to="/"
            className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold"
          >
            SEENEMA
          </NavLink>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
        xl:text-bold"
        >
          {t("Đăng kí")}
        </h2>
        <div className="mt-6">
          <div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                {t("Tài khoản")}
              </div>
              <input
                name="taiKhoan"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="example123"
              />
              {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                <p className="text-red-600">{formik.errors.taiKhoan}</p>
              )}
            </div>
            <div className="mt-6">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                {t("Họ tên")}
              </div>
              <input
                name="hoTen"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="example"
              />
              {formik.errors.hoTen && formik.touched.hoTen && (
                <p className="text-red-600">{formik.errors.hoTen}</p>
              )}
            </div>
            <div className="mt-6">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                {t("Số điện thoại")}
              </div>
              <input
                name="soDt"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="xxxxxxxxxx"
              />
              {formik.errors.soDt && formik.touched.soDt && (
                <p className="text-red-600">{formik.errors.soDt}</p>
              )}
            </div>
            <div className="mt-6">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                {t("Email")}
              </div>
              <input
                name="email"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="example@gmail.com"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-600">{formik.errors.email}</p>
              )}
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("Mật khẩu")}
                </div>
                <div>
                  <a
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                          cursor-pointer"
                    href="#"
                  >
                    {t("Quên mật khẩu ?")}
                  </a>
                </div>
              </div>
              <input
                type="password"
                name="matKhau"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="******"
              />
              {formik.errors.matKhau && formik.touched.matKhau && (
                <p className="text-red-600">{formik.errors.matKhau}</p>
              )}
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("Nhập lại mật khẩu")}
                </div>
              </div>
              <input
                type="password"
                name="passwordConfirm"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="******"
              />
              {formik.errors.passwordConfirm &&
                formik.touched.passwordConfirm && (
                  <p className="text-red-600">
                    {formik.errors.passwordConfirm}
                  </p>
                )}
            </div>
            <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                  shadow-lg"
              >
                {t("Đăng kí")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
