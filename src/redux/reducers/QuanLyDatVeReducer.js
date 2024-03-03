import {
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "../actions/types/QuanLyDatVeType";
// import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";

const stateDefault = {
  chiTietPhongVe: {},
  danhSachGheDangDat: [],
  danhSachGheKhachDat: [],
  tabActive: "1",
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE: {
      return { ...state, chiTietPhongVe: action.chiTietPhongVe };
    }

    case DAT_VE: {
      //Cập nhật danh sách ghế đang đặt
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
      );
      if (index !== -1) {
        //Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xoá đi
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.gheDuocChon);
      }
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }

    case DAT_VE_HOAN_TAT: {
      return { ...state, danhSachGheDangDat: [] };
    }

    case CHUYEN_TAB: {
      return { ...state, tabActive: "2" };
    }

    case "CHANGE_TAB_ACTIVE": {
      return { ...state, tabActive: action.number };
    }

    case "DAT_GHE": {
      return { ...state, danhSachGheKhachDat: action.arrGheKhachDat };
    }
    default:
      return { ...state };
  }
};
