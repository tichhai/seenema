import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  dangKi = (thongTinDangKi) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKi);
  };

  layThongTinNguoiDung = () => {
    return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  };
  capNhatThongTinNguoiDung = (thongTinNguoiDung) => {
    return this.put(
      "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      thongTinNguoiDung
    );
  };
  capNhatThongTinNguoiDungEdit = (thongTinNguoiDung) => {
    return this.post(
      "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      thongTinNguoiDung
    );
  };

  layDanhSachNguoiDung = () => {
    return this.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };
  layDanhSachNguoiDungTheoTuKhoa = (tuKhoa) => {
    if (tuKhoa)
      return this.get(
        `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
      );
    return this.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
  themNguoiDung = (thongTinTaiKhoan) => {
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, thongTinTaiKhoan);
  };
  timNguoiDungTheoTaiKhoan = (id) => {
    return this.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${id}`
    );
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
