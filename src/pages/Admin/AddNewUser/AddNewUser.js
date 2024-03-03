import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { GROUPID } from "../../../util/settings/config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { themTaiKhoanAction } from "../../../redux/actions/QuanLyNguoiDungAction";

const AddNewUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDt: "",
      email: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: "KhachHang",
    },
    validationSchema: Yup.object({
      soDt: Yup.number()
        .typeError("Vui lòng chỉ nhập số!")
        .positive("Chỉ nhập số dương!")
        .integer("Chỉ nhập số nguyên!")
        .min(10, "Ít nhất 10 ký tự!")
        .required("Số điện thoại không được để trống!"),
      email: Yup.string()
        .email("Email không hợp lệ!")
        .required("Email không được để trống!"),
      taiKhoan: Yup.string()
        .min(2, "Ít nhất 2 ký tự!")
        .required("Tài khoản không được để trống!"),
      matKhau: Yup.string()
        .min(6, "Ít nhất 6 ký tự!")
        .required("Mật khẩu không được để trống!"),
      hoTen: Yup.string().required("Họ tên không được để trống!"),
    }),
    onSubmit: (values) => {
      dispatch(themTaiKhoanAction(values, t, navigate));
    },
  });

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 12,
        }}
        layout="horizontal"
        style={{ width: "100%" }}
      >
        <div className="flex">
          <div>
            <Form.Item label={t("Email")}>
              <Input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-600">{formik.errors.email}</p>
              )}
            </Form.Item>
            <Form.Item label={t("Họ tên")}>
              <Input
                name="hoTen"
                onChange={formik.handleChange}
                value={formik.values.hoTen}
              />
              {formik.errors.hoTen && formik.touched.hoTen && (
                <p className="text-red-600">{formik.errors.hoTen}</p>
              )}
            </Form.Item>
            <Form.Item label={t("Số điện thoại")}>
              <Input
                name="soDt"
                onChange={formik.handleChange}
                value={formik.values.soDt}
              />
              {formik.errors.soDt && formik.touched.soDt && (
                <p className="text-red-600">{formik.errors.soDt}</p>
              )}
            </Form.Item>
          </div>
          <div>
            <Form.Item label={t("Tài khoản")}>
              <Input
                name="taiKhoan"
                onChange={formik.handleChange}
                value={formik.values.taiKhoan}
              />
              {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                <p className="text-red-600">{formik.errors.taiKhoan}</p>
              )}
            </Form.Item>
            <Form.Item label={t("Mật khẩu")}>
              <Input
                name="matKhau"
                onChange={formik.handleChange}
                value={formik.values.matKhau}
                type="password"
              />
              {formik.errors.matKhau && formik.touched.matKhau && (
                <p className="text-red-600">{formik.errors.matKhau}</p>
              )}
            </Form.Item>
            <Form.Item label={"Loại người dùng"}>
              <Select
                options={[
                  { label: "Khách Hàng", value: "KhachHang" },
                  { label: "Quản Trị", value: "QuanTri" },
                ]}
                onChange={(value) => {
                  formik.setFieldValue("maLoaiNguoiDung", value);
                }}
                defaultValue={{ label: "Khách Hàng", value: "KhachHang" }}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex ml-[250px]">
          <Form.Item className="flex justify-center items-center">
            <Button htmlType="submit">Thêm</Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default AddNewUser;
