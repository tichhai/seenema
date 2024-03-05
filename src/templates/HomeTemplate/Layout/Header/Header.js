import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";
import { EyeOutlined } from "@ant-design/icons";

const { Option } = Select;
export default function Header(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { executeScroll } = useSelector((state) => state.ScrollToReducer);

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            {t("Đăng nhập")}
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded text-coolGray-50"
          >
            {t("Đăng kí")}
          </button>
        </>
      );
    }

    return (
      <>
        {" "}
        <button
          onClick={() => {
            navigate("/profile");
          }}
          className="self-center px-8 py-3 rounded"
        >
          {t("Xin chào")}! {userLogin.taiKhoan}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            navigate("/home");
            window.location.reload();
          }}
          className="text-yellow-500 mr-5"
        >
          {t("Đăng xuất")}
        </button>
      </>
    );
  };
  return (
    <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <EyeOutlined className="text-2xl text-white mr-2" /> Seenema
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white"
            >
              {t("Trang chủ")}
            </NavLink>
          </li>
          <li className="flex">
            <button
              onClick={executeScroll}
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white"
            >
              {t("Khuyến mãi")}
            </button>
          </li>
          <li className="flex">
            <button
              onClick={executeScroll}
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white"
            >
              {t("Tin tức")}
            </button>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}

          <Select
            defaultValue="vi"
            style={{ width: "75px" }}
            onChange={handleChange}
          >
            <Option value="vi" className="w-auto">
              Vi
            </Option>
            <Option value="en" className="w-auto">
              Eng
            </Option>
            <Option value="chi" className="w-auto">
              Chi
            </Option>
          </Select>
        </div>
        <button className="p-4 lg:hidden" onClick={() => console.log(1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-coolGray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
