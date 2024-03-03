import React, { useEffect, useState } from "react";
import { Button, Form, Input, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatThongTinNguoiDungAction,
  layThongTinNguoiDungAction,
} from "../../redux/actions/QuanLyNguoiDungAction";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { GROUPID } from "../../util/settings/config";
import moment from "moment";
import _ from "lodash";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "THÔNG TIN CÁ NHÂN",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "LỊCH SỬ ĐẶT VÉ",
    children: <p>234</p>,
  },
];

export default function Profile(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { t } = useTranslation();
  const [isChangingPass, setIsChangingPass] = useState(false);
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      matKhauCu: "",
      matKhauMoi: "",
      taiKhoan: thongTinNguoiDung.taiKhoan,
      matKhau: thongTinNguoiDung.matKhau,
      hoTen: thongTinNguoiDung.hoTen,
      soDt: thongTinNguoiDung.soDT,
      email: thongTinNguoiDung.email,
      maNhom: GROUPID,
      maLoaiNguoiDung:
        thongTinNguoiDung.loaiNguoiDung === "Quản trị"
          ? "QuanTri"
          : "KhachHang",
    },
    validationSchema: Yup.object({
      soDt: Yup.number()
        .typeError(t("Vui lòng chỉ nhập số!"))
        .positive(t("Chỉ nhập số dương!"))
        .integer(t("Chỉ nhập số nguyên!"))
        .min(10, t("Ít nhất 10 ký tự!"))
        .required(t("Số điện thoại không được để trống!")),
      email: Yup.string()
        .email(t("Email không hợp lệ!"))
        .required(t("Email không được để trống!")),
    }),
    onSubmit: (values) => {
      if (isChangingPass) {
        if (values.matKhauCu !== values.matKhau) {
          alert(t("Mật khẩu không chính xác!"));
        } else if (
          values.matKhauCu === values.matKhau &&
          values.matKhauMoi.length < 6
        ) {
          alert(t("Mật khẩu mới phải chứa ít nhất 6 ký tự!"));
        } else {
          dispatch(
            capNhatThongTinNguoiDungAction(
              {
                ...values,
                matKhau: values.matKhauMoi,
              },
              t
            )
          );
          setIsChangingPass(false);
        }
      } else dispatch(capNhatThongTinNguoiDungAction(values, t));
    },
  });
  items[0].label = `${t("THÔNG TIN CÁ NHÂN")}`;
  items[1].label = `${t("LỊCH SỬ ĐẶT VÉ")}`;
  const renderThongTinCaNhan = () => {
    return (
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
                disabled
              />
            </Form.Item>
            <Form.Item label={t("Mật khẩu")}>
              <Input
                name="matKhau"
                disabled
                onChange={formik.handleChange}
                value={formik.values.matKhau}
                type="password"
              />
            </Form.Item>
            {!isChangingPass ? (
              <>
                <Form.Item className="ml-9">
                  <Button
                    onClick={() => setIsChangingPass(true)}
                    htmlType="button"
                  >
                    {t("Đổi mật khẩu")}
                  </Button>
                </Form.Item>
              </>
            ) : (
              <></>
            )}
            {isChangingPass ? (
              <>
                <Form.Item label={t("Mật khẩu cũ")}>
                  <Input
                    name="matKhauCu"
                    onChange={formik.handleChange}
                    value={formik.values.matKhauCu}
                    type="password"
                  />
                </Form.Item>
                <Form.Item label={t("Mật khẩu mới")}>
                  <Input
                    name="matKhauMoi"
                    onChange={formik.handleChange}
                    value={formik.values.matKhauMoi}
                    type="password"
                  />
                  {formik.errors.matKhauMoi && formik.touched.matKhauMoi && (
                    <p className="text-red-600">{formik.errors.matKhauMoi}</p>
                  )}
                </Form.Item>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Form.Item className="flex justify-center items-center">
          <Button htmlType="submit">{t("Cập nhật")}</Button>
        </Form.Item>
      </Form>
    );
  };

  const renderLichSuDatVe = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
      return (
        <div className="p-2 lg:w-full md:w-1/2 w-full border mt-3">
          <div className="h-full flex items-center p-4">
            <img
              alt={item.tenPhim}
              className="w-[100px] h-[100px] bg-gray-100 object-cover object-center flex-shrink-0 mx-4 mt-5"
              src={item.hinhAnh}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/100/100";
              }}
            />
            <div className="flex-grow flex">
              <img
                className="w-[50px] h-[50px]"
                src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg"
                alt="cinema"
              />
              <div className="ml-2">
                <h2 className="text-yellow-500 title-font font-medium text-2xl">
                  {item.tenPhim}
                </h2>

                <span className="font-bold text-red-600">
                  {" "}
                  {(item.giaVe * item.danhSachGhe.length).toLocaleString()}đ -
                </span>
                <span className="font-bold text-red-600">
                  {" "}
                  Mã vé: {item.maVe}
                </span>
              </div>
            </div>
          </div>
          {_.uniqBy(item.danhSachGhe, "maCumRap")?.map((infoGhe, i) => {
            return (
              <>
                <div className="text-center">
                  <span className="text-gray-500">
                    {infoGhe.tenHeThongRap} -
                  </span>
                  <span className="text-gray-500"> {infoGhe.tenCumRap}</span>
                </div>
                <p className="w-full text-center">
                  Thời lượng phim: {item.thoiLuongPhim} phút
                </p>
                <div className="flex justify-center items-center flex-wrap">
                  <p className="text-red-600 font-bold w-full text-center">
                    {moment(item.ngayDat).format("DD/MM/YYYY")}{" "}
                    {moment(item.ngayDat).format("hh:mm A")}
                  </p>
                </div>
              </>
            );
          })}
          <div className="text-center">
            Ghế:
            {item.danhSachGhe?.map((infoGhe, i) => {
              return (
                <>
                  <span className="font-bold text-green-500 text-xl">
                    {" "}
                    [ {infoGhe.tenGhe} ]{" "}
                  </span>
                </>
              );
            })}
          </div>
        </div>
      );
    });
  };

  // {item.danhSachGhe?.map((info, i) => {
  //   return (

  //   )
  // })}

  // <div className="p-2 lg:w-full md:w-1/2 w-full border rounded-full">
  //       <div className="h-full flex items-center p-4">
  //         <img
  //           alt="team"
  //           className="w-[100px] h-[100px] bg-gray-100 object-cover object-center flex-shrink-0 mx-4"
  //           src="https://picsum.photos/100/100"
  //         />
  //         <div className="flex-grow flex">
  //           <img
  //             className="w-[50px] h-[50px]"
  //             src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg"
  //             alt="cinema"
  //           />
  //           <div className="ml-2">
  //             <h2 className="text-yellow-500 title-font font-medium text-2xl">
  //               John wick
  //             </h2>

  //             <span className="text-gray-500">BHD Star Cineplex - 3/2 -</span>
  //             <span className="text-gray-500"> Rạp 1 -</span>
  //             <span className="text-gray-500"> 20/03/2003 -</span>
  //             <span className="font-bold text-red-600"> 90.000đ -</span>
  //             <span className="font-bold text-red-600"> Mã vé: 100123</span>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex justify-center items-center flex-wrap">
  //         <p className="text-red-600 font-bold w-full text-center">
  //           {/* <span className="font-bold">{t("Giờ chiếu")}:</span>{" "}
  //               {moment(ticket.ngayDat).format("hh:mm A")} -{" "}
  //               <span className="font-bold">{t("Ngày chiếu")}:</span>{" "}
  //               {moment(ticket.ngayDat).format("DD-MM-YYYY")} . */}
  //           Ngày giờ chiếu: 20/09/2003 1:40 AM
  //         </p>
  //         <p className="w-full text-center">Thời lượng phim: 120 phút</p>
  //         Ghế: <p className="font-bold text-green-500 text-xl"> [ 101 ] </p>
  //       </div>
  //     </div>
  items[0].children = renderThongTinCaNhan();
  items[1].children = renderLichSuDatVe();
  return (
    <Tabs
      style={{ paddingTop: "150px", width: "100vw" }}
      defaultActiveKey="1"
      className="flex justify-center items-center"
      items={items}
      onChange={onChange}
    />
  );
}
