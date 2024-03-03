import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  DANG_KI_ACTION,
  DANG_NHAP_ACTION,
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG_THEO_TU_KHOA,
  SET_THONG_TIN_NGUOI_DUNG,
  SUA_THONG_TIN_NGUOI_DUNG,
  TIM_NGUOI_DUNG_THEO_TU_KHOA,
} from "../actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  thongTinNguoiDung: {},
  danhSachNguoiDung: [],
  danhSachNguoiDungEdit: [],
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }
    case DANG_KI_ACTION: {
      return { ...state };
    }
    case SET_THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinNguoiDung: action.thongTinNguoiDung };
    }
    case SUA_THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinNguoiDung: action.thongTinNguoiDung };
    }
    case LAY_DANH_SACH_NGUOI_DUNG: {
      return { ...state, danhSachNguoiDung: action.danhSachNguoiDung };
    }
    case LAY_DANH_SACH_NGUOI_DUNG_THEO_TU_KHOA: {
      return {
        ...state,
        danhSachNguoiDung: action.danhSachNguoiDung,
      };
    }
    case TIM_NGUOI_DUNG_THEO_TU_KHOA: {
      return {
        ...state,
        danhSachNguoiDungEdit: action.thongTinNguoiDung,
      };
    }
    default:
      return { ...state };
  }
};
