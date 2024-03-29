import { Menu } from 'antd';
import { 
    AppstoreOutlined,
    UserOutlined,
    AreaChartOutlined, 
    FacebookOutlined, 
    OrderedListOutlined,
    BankOutlined,
    KeyOutlined,
    IdcardOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Sider = ({
    handleClick,
}) => {
    const handleClickOutSize = e => {
        if (handleClick) {
            handleClick(e);
        }
    };

    return (
        <Menu
            onClick={handleClickOutSize}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <Menu.Item value="profile" icon={<UserOutlined />} key="1">Thông tin admin</Menu.Item>

            <Menu.Item value="introduction" icon={<IdcardOutlined />} key="10">Giới thiệu</Menu.Item>

            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Sản Phẩm">
                <Menu.Item title="Sản Phẩm" value="product-list" key="2">Danh sách</Menu.Item>
                {/* <Menu.Item title="Sản Phẩm" value="product-create" key="3">Tạo mới</Menu.Item> */}                
            </SubMenu>

            <SubMenu key="sub3" icon={<BankOutlined />} title="Dự án">
                <Menu.Item title="Dự án" value="portfolio-list" key="4">Danh sách</Menu.Item>
                {/* <Menu.Item title="Dự án" value="portfolio-create" key="5">Tạo mới</Menu.Item> */}
            </SubMenu>

            <SubMenu key="sub4" icon={<OrderedListOutlined />} title="Category">
                <Menu.Item title="Category" value="category-list" key="6">Danh sách</Menu.Item>
                {/* <Menu.Item title="Category" value="category-create" key="7">Tạo mới</Menu.Item> */}
            </SubMenu>

            <SubMenu key="sub5" icon={<FacebookOutlined />} title="Socials">
                <Menu.Item title="Socials" value="socials-list" key="8">Danh sách</Menu.Item>
                {/* <Menu.Item title="Socials" value="socials-create" key="9">Tạo mới</Menu.Item> */}
            </SubMenu>

            <Menu.Item title="Hình ảnh upload" value="image-create" icon={<AreaChartOutlined />} key="7">Tải ảnh lên</Menu.Item>

            <Menu.Item title="Đổi mật khẩu" value="change-password" icon={<KeyOutlined />} key="9">Đổi mật khẩu</Menu.Item>
        </Menu>
    );

}

export default Sider;