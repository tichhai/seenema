import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import {
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "./types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      dispatch(displayLoadingAction);

      // eslint-disable-next-line no-unused-vars
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      //Đặt vé thành công gọi api load lại phòng vé
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
      await dispatch({ type: DAT_VE_HOAN_TAT });
      await dispatch(hideLoadingAction);

      // let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
      // connection.invoke(
      //   "datGheThanhCong",
      //   userLogin.taiKhoan,
      //   thongTinDatVe.maLichChieu
      // );
      dispatch({ type: CHUYEN_TAB });
    } catch (error) {
      dispatch(hideLoadingAction);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: DAT_VE,
      gheDuocChon: ghe,
    });

    //Call api về backend, getState = lấy dữ liệu từ store khác
    // let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    // let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

    //Biến mảng thành chuỗi
    // danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    //Call api signalR
    // connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};
