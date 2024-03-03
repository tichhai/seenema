import React, { useEffect, useRef, useState } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from "../../components/RSlick/MutipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import "./Home.css";

const { Meta } = Card;

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const dispatch = useDispatch();
  const [activeTabKey2, setActiveTabKey2] = useState("khuyenMai");
  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);

    dispatch(layDanhSachHeThongRapAction());
    dispatch({ type: "SCROLL_TO", executeScroll: executeScroll });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  const { t } = useTranslation();
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();
  const tabListNoTitle = [
    {
      key: "khuyenMai",
      label: t("Khuyến mãi"),
    },
    {
      key: "tinTuc",
      label: t("Tin tức"),
    },
  ];
  const contentListNoTitle = {
    khuyenMai: (
      <div className="flex justify-center items-center">
        <a href="https://vnexpress.net/">
          <Card
            hoverable
            style={{ width: 350 }}
            cover={
              <img
                alt="news"
                src="https://s3img.vcdn.vn/123phim/2021/04/bhd-59k-ve-ca-tuan-16190002421777.jpg"
              />
            }
          >
            <Meta
              title={t("BHD 59K/VÉ CẢ TUẦN !!!")}
              description={t(
                "Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay."
              )}
              className="h-[100px]"
            />
          </Card>
        </a>
        <a href="https://vnexpress.net/">
          <Card
            className="ml-5"
            hoverable
            style={{ width: 350 }}
            cover={
              <img
                alt="news"
                src="https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662877511.jpg"
              />
            }
          >
            <Meta
              title={t("TIX 1K/VÉ NGẠI CHI GIÁ VÉ")}
              className="h-[100px]"
              description={t(
                "Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm 02 voucher thanh toán ZaloPay thả ga"
              )}
            />
          </Card>
        </a>
      </div>
    ),
    tinTuc: (
      <div className="flex justify-center items-center">
        <a href="https://vnexpress.net/">
          <Card
            hoverable
            style={{ width: 350 }}
            cover={
              <img
                alt="news"
                src="https://s3img.vcdn.vn/123phim/2021/03/an-dinh-chac-nich-ngay-khoi-chieu-16-04-ly-hai-tung-clip-lat-mat-48h-dam-chat-fast-furious-mien-song-nuoc-16170881088272.png"
              />
            }
          >
            <Meta
              className="h-[100px]"
              title={t(
                "Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất"
              )}
              description={t(
                "Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ"
              )}
            />
          </Card>
        </a>
        <a href="https://vnexpress.net/">
          <Card
            className="ml-5"
            hoverable
            style={{ width: 350 }}
            cover={
              <img
                alt="news"
                src="https://s3img.vcdn.vn/123phim/2021/03/mortal-kombat-cuoc-chien-sinh-tu-goi-ten-nhung-phim-dien-anh-noi-tieng-duoc-chuyen-the-tu-cac-tua-game-dinh-dam-16170160290762.png"
              />
            }
          >
            <Meta
              className="h-[100px]"
              title={t(
                "[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI..."
              )}
              description={t(
                "Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón ..."
              )}
            />
          </Card>
        </a>
      </div>
    ),
  };
  return (
    <div>
      <HomeCarousel />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto ">
          <MultipleRowSlick arrFilm={arrFilm} />
        </div>
      </section>
      <div className="mx-36">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
      <div className="text-center">
        <Card
          style={{
            width: "100%",
          }}
          ref={myRef}
          className="flex justify-center items-center flex-col"
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey2}
          onTabChange={onTab2Change}
          tabProps={{
            size: "middle",
          }}
        >
          {contentListNoTitle[activeTabKey2]}
        </Card>
      </div>
      <div className="flex justify-center items-start my-10">
        <div className="flex justify-center items-center ml-5 w-2/3">
          <a href="https://vnexpress.net/">
            <Card
              hoverable
              style={{ width: 350 }}
              cover={
                <img
                  alt="news"
                  src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png"
                />
              }
            >
              <Meta
                title="PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù..."
                description="Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất ..."
              />
            </Card>
          </a>
          <a href="https://vnexpress.net/">
            <Card
              className="ml-5"
              hoverable
              style={{ width: 350 }}
              cover={
                <img
                  alt="news"
                  src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png"
                />
              }
            >
              <Meta
                title="VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ"
                description="Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, ..."
              />
            </Card>
          </a>
        </div>
        <div className="ml-5 flex-shrink-0 w-1/3">
          <a className="flex" href="https://vnexpress.net/">
            <img
              alt="news"
              src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg"
              height={70}
              width={70}
            />
            <p className="ml-2">
              Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn
            </p>
          </a>
          <a className="flex mt-2" href="https://vnexpress.net/">
            <img
              alt="news"
              src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png"
              height={70}
              width={70}
            />
            <p className="ml-2">
              “Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành
            </p>
          </a>
          <a className="flex mt-2" href="https://vnexpress.net/">
            <img
              alt="news"
              src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png"
              height={70}
              width={70}
            />
            <p className="ml-2">
              Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công chiếu
            </p>
          </a>
          <a className="flex mt-2" href="https://vnexpress.net/">
            <img
              alt="example"
              src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
              height={70}
              width={70}
            />
            <p className="ml-2">NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI</p>
          </a>
        </div>
      </div>
    </div>
  );
}
