import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { Input } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  layDanhSachNguoiDungAction,
  layDanhSachNguoiDungTheoTuKhoaAction,
  xoaTaiKhoanAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";

const { Search } = Input;

export default function Dashboard() {
  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: "15%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      sorter: (a, b) => a.soDt - b.soDt,
      width: "25%",
    },
    {
      title: "Thao tác",
      dataIndex: "taiKhoan",
      render: (text, user) => {
        return (
          <>
            <NavLink
              key={1}
              className=" mr-2  text-2xl"
              to={`/admin/users/edit/${user.taiKhoan}`}
            >
              <EditOutlined style={{ color: "blue" }} />{" "}
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-2xl"
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có chắc muốn xoá tài khoản " + user.taiKhoan
                  )
                ) {
                  dispatch(xoaTaiKhoanAction(user.taiKhoan, t));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />{" "}
            </span>
          </>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
  ];

  const data = danhSachNguoiDung;

  const onSearch = (value) => {
    dispatch(layDanhSachNguoiDungTheoTuKhoaAction(value));
  };

  function onChange(pagination, filters, sorter, extra) {}

  return (
    <div>
      <h3 className="text-4xl">Quản lý người dùng</h3>
      <Button
        className="my-5"
        onClick={() => {
          navigate("/admin/users/addnew");
        }}
      >
        Thêm người dùng
      </Button>
      <Search
        className="mb-5"
        placeholder="Nhập họ tên người dùng muốn tìm ..."
        enterButton={<SearchOutlined style={{ color: "black" }} />}
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}
