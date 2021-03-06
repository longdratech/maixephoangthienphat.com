import { Menu } from 'antd';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Sider extends React.Component {
    handleClick = e => {
        console.log('click ', e);
    };

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <Menu.Item icon={<UserOutlined />} key="1">Thông tin admin</Menu.Item>
                
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Sản Phẩm">
                    <Menu.Item key="5">Tạo mới</Menu.Item>
                    <Menu.Item key="6">Danh sách</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Dự án">
                    <Menu.Item key="5">Tạo mới</Menu.Item>
                    <Menu.Item key="6">Danh sách</Menu.Item>
                </SubMenu>
                
                <Menu.Item icon={<AppstoreOutlined />} key="7">Tải ảnh lên</Menu.Item>

                <SubMenu key="sub4" icon={<AppstoreOutlined />} title="Category">
                    <Menu.Item key="8">Tạo mới</Menu.Item>
                    <Menu.Item key="9">Danh sách</Menu.Item>
                </SubMenu>
                   
            </Menu>
        );
    }
}

export default Sider;