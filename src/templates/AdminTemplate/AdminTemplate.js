import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Layout, Menu, Breadcrumb } from "antd";
import { FileOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminTemplate({ Component, ...restProps }) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const navigate = useNavigate();
  let { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!localStorage.getItem(USER_LOGIN)) {
    navigate("/home");
    return;
  }

  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    navigate("/home");
    return;
  }

  const operations = (
    <>
      {!_.isEmpty(userLogin) ? (
        <>
          {" "}
          <button
            onClick={() => {
              navigate("/profile");
            }}
          >
            {" "}
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-5 rounded-full bg-red-200"
            >
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
            Xin chào ! {userLogin.taiKhoan}
          </button>{" "}
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              navigate("/home");
              window.location.reload();
            }}
            className="text-blue-800"
          >
            Đăng xuất
          </button>{" "}
        </>
      ) : (
        ""
      )}
    </>
  );
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <NavLink
            to={"/"}
            className="logo p-5 flex justify-center items-center flex-wrap"
          >
            <EyeOutlined className="text-3xl text-white" />
            <span className="text-white ml-2">SEENEMA</span>
          </NavLink>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to="/admin/users">Users</NavLink>
            </Menu.Item>
            <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
              <Menu.Item key="10" icon={<FileOutlined />}>
                <NavLink to="/admin/films">Films</NavLink>
              </Menu.Item>
              <Menu.Item key="11" icon={<FileOutlined />}>
                <NavLink to="/admin/films/addnew">Add new</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="text-right pr-10 pt-1">{operations}</div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: "85vh" }}
            >
              <Component {...restProps} id={id} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminTemplate;
