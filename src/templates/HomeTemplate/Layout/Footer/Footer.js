/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  GithubOutlined,
  FacebookOutlined,
  EyeOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Footer(props) {
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const { t } = useTranslation();

  const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) =>
    _.pick(heThongRap, ["maHeThongRap", "tenHeThongRap", "logo"])
  );

  return (
    <footer className="py-6 bg-coolGray-100 text-coolGray-900 bg-gray-800">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <a
              href="#"
              className="flex justify-center space-x-3 md:justify-start text-black"
            >
              <EyeOutlined className="text-9xl text-white" />
            </a>
            <span className="text-white ml-7">SEENEMA</span>
          </div>
          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 text-lg font-medium text-white">
              {t("ĐỐI TÁC")}
            </p>
            <div className="grid grid-cols-3" style={{ color: "#fff" }}>
              {arrHeThongRap.map((htr, index) => {
                return (
                  <div key={index}>
                    <img src={htr.logo} style={{ width: 50 }} alt="logo" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-6 text-center md:text-left md:col-span-3 text-white">
            <p className="pb-1 text-lg font-medium">{t("Liên hệ")}</p>
            <div className="flex text-white">
              <a
                className="mr-5"
                href="https://www.linkedin.com/in/h%E1%BA%A3i-t%C3%ADch-686634243/"
              >
                <LinkedinOutlined className="text-2xl" />
              </a>
              <a
                className="mr-5"
                href="https://www.facebook.com/profile.php?id=100037784133388&locale=vi_VN"
              >
                <FacebookOutlined className="text-2xl" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100037784133388&locale=vi_VN">
                <GithubOutlined className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between text-white">
          <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
            <span>©2024 All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
