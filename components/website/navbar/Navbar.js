import { Menu } from 'antd';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';

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

            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Sản Phẩm">
                <Menu.Item value="product-list" key="2">Danh sách</Menu.Item>
                <Menu.Item value="product-create" key="3">Tạo mới</Menu.Item>
                
            </SubMenu>

            <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Dự án">
                <Menu.Item value="portfolio-list" key="4">Danh sách</Menu.Item>
                <Menu.Item value="portfolio-create" key="5">Tạo mới</Menu.Item>
            </SubMenu>

            <Menu.Item value="product" icon={<AppstoreOutlined />} key="7">Tải ảnh lên</Menu.Item>

            <SubMenu key="sub4" icon={<AppstoreOutlined />} title="Category">
                <Menu.Item value="category-list" key="6">Danh sách</Menu.Item>
                <Menu.Item value="category-create" key="7">Tạo mới</Menu.Item>
            </SubMenu>

        </Menu>
    );

}

export default Sider;