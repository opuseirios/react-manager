import React from 'react'
import {Menu, Icon} from 'antd'
import {NavLink} from 'react-router-dom'
import MenuConfig from './../../config/menuConfig'
import './navLeft.less'

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTreeNode: []
    }
  }

  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig)
    this.setState({
      menuTreeNode
    })
  }

  //菜单渲染
  renderMenu = (data) => {
    return data.map((item,index)=>{
      if(item.children){
        return(
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Item>
    })
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Imooc MS</h1>
        </div>
        <Menu theme={"dark"}>
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}

export default NavLeft;
