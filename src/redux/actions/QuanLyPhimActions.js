/* eslint-disable no-unused-vars */
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from "../../App";

export const layDanhSachPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const themPhimUploadHinhAction = (formData, navigate, t) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert(t("Thêm phim thành công!"));
      navigate("/admin/films");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData, navigate, t) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.capNhatPhimUpload(formData);
      alert(t("Cập nhật thành công!"));

      dispatch(layDanhSachPhimAction());
      //--------------------------------------------
      navigate("/admin/films");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);

      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const xoaPhimAction = (maPhim, t) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
      alert(t("Xoá phim thành công!"));
      //Sau khi xoá load lại danh sách phim mới;
      dispatch(layDanhSachPhimAction());
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
