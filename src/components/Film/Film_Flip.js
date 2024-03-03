import React, { useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import "./Film_Flip.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import ReactPlayer from "react-player/youtube";

export default function Film_Flip(props) {
  const { item } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="flip-card mt-2">
      <Modal
        onCancel={() => {
          setIsModalOpen(false);
        }}
        open={isModalOpen}
        footer=""
        width={600}
        styles={{ height: 400 }}
      >
        <ReactPlayer
          width={"100%"}
          url={
            item.trailer
              ? item.trailer
              : `https://youtu.be/EX6clvId19s?si=GGjnPLaJkwQYCvHf`
          }
        />
      </Modal>
      <div
        className="flip-card-inner"
        onClick={() => {
          console.log(item);
          showModal();
        }}
      >
        <div className="flip-card-front">
          <img
            src={item.hinhAnh}
            alt="Avatar"
            style={{ width: 300, height: 300 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/300/300";
            }}
          />
        </div>
        <div
          className="flip-card-back"
          style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <img
              src={item.hinhAnh}
              alt="Avatar"
              style={{ width: 300, height: 300 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/300/300";
              }}
            />
          </div>
          <div
            className="w-full h-full"
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className="rounded-full cursor-pointer">
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </div>
              <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          navigate(`/detail/${item.maPhim}`);
        }}
        className="text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold"
      >
        {t("ĐẶT VÉ")}
      </div>
    </div>
  );
}
