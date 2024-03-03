import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import {
  DANG_KI_ACTION,
  DANG_NHAP_ACTION,
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG_THEO_TU_KHOA,
  SET_THONG_TIN_NGUOI_DUNG,
  SUA_THONG_TIN_NGUOI_DUNG,
  SUA_THONG_TIN_NGUOI_DUNG_EDIT,
  TIM_NGUOI_DUNG_THEO_TU_KHOA,
} from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap, navigate, t) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        navigate(-1);
      }
    } catch (error) {
      console.log("error", error);
      if (error.response?.data?.statusCode === 404)
        alert(t("Tài khoản hoặc mật khẩu không đúng!"));
    }
  };
};

export const dangKiAction = (thongTinDangKi, navigate, t) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKi(thongTinDangKi);
      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_KI_ACTION,
          thongTinDangKi: result.data.content,
        });
        let values = {
          taiKhoan: thongTinDangKi.taiKhoan,
          matKhau: thongTinDangKi.matKhau,
        };
        dispatch(dangNhapAction(values, navigate, t));
        navigate(-1);
      }
    } catch (error) {
      console.log("error", error);
      if (error.response?.data?.content === "Email đã tồn tại!")
        alert(t("Email đã tồn tại!"));
      else if (error.response?.data?.content === "Tài khoản đã tồn tại!")
        alert(t("Tài khoản đã tồn tại!"));
    }
  };
};

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();

      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const capNhatThongTinNguoiDungAction = (thongTinNguoiDung, t) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        thongTinNguoiDung
      );

      if (result.data.statusCode === 200) {
        dispatch({
          type: SUA_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
      dispatch(layThongTinNguoiDungAction());
      alert(t("Cập nhật thành công!"));
    } catch (error) {
      console.log("error", error);
      if (error.response?.data?.content === "Email đã tồn tại!")
        alert(t("Email đã tồn tại!"));
    }
  };
};
export const capNhatThongTinNguoiDungEditAction = (
  thongTinNguoiDung,
  t,
  navigate
) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDungEdit(
        thongTinNguoiDung
      );

      if (result.data.statusCode === 200) {
        dispatch({
          type: SUA_THONG_TIN_NGUOI_DUNG_EDIT,
          thongTinNguoiDung: result.data.content,
        });
      }
      alert("Cập nhật thành công!");
      dispatch(layThongTinNguoiDungAction());
      navigate("/admin/users");
    } catch (error) {
      console.log("error", error);
      if (error.response?.data?.content === "Email đã tồn tại!")
        alert(t("Email đã tồn tại!"));
    }
  };
};

export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung();
      if (result.data.statusCode === 200) {
        dispatch({
          type: LAY_DANH_SACH_NGUOI_DUNG,
          danhSachNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const layDanhSachNguoiDungTheoTuKhoaAction = (tuKhoa) => {
  return async (dispatch) => {
    try {
      const result =
        await quanLyNguoiDungService.layDanhSachNguoiDungTheoTuKhoa(tuKhoa);
      if (result.data.statusCode === 200) {
        dispatch({
          type: LAY_DANH_SACH_NGUOI_DUNG_THEO_TU_KHOA,
          danhSachNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const xoaTaiKhoanAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      alert("Xoá tài khoản thành công!");
      //Sau khi xoá load lại danh sách mới;
      dispatch(layDanhSachNguoiDungAction());
    } catch (errors) {
      console.log("errors", errors);
      if (errors.response?.statusText === "Unauthorized")
        alert("Bạn không đủ quyền!");
      else if (
        errors.response?.data?.content ===
        "Người dùng này đã đặt vé xem phim không thể xóa!"
      )
        alert("Người dùng này đã đặt vé xem phim không thể xóa!");
    }
  };
};
export const themTaiKhoanAction = (thongTinTaiKhoan, t, navigate) => {
  return async (dispatch) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await quanLyNguoiDungService.themNguoiDung(
        thongTinTaiKhoan
      );
      //Sau khi xoá load lại danh sách mới;
      dispatch(layDanhSachNguoiDungAction());
      alert("Thêm tài khoản thành công!");
      navigate("/admin/users");
    } catch (errors) {
      console.log("errors", errors);
      if (errors.response?.statusText === "Unauthorized")
        alert("Bạn không đủ quyền!");
    }
  };
};

export const timNguoiDungTheoTuKhoaAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.timNguoiDungTheoTaiKhoan(id);
      if (result.data.statusCode === 200) {
        dispatch({
          type: TIM_NGUOI_DUNG_THEO_TU_KHOA,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
