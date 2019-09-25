import React from 'react'
import moment from 'moment'
import {Card, Button, Table, Form, Select, Modal, message} from 'antd'
import axios from 'axios'
import {pagination} from "../../utils/util";

const FormItem = Form.Item;
const Option = Select.Option;

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShowOpenCity: false
    }
  }

  params = {
    page: 1
  }

  componentDidMount(){
    this.handleCityData(this.params.page);
  }

  //开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }

  //城市开通提交
  handleSubmit = () => {
    const cityInfo = this.cityForm.props.form.getFieldsValue();
    axios.post('/city/open',{
      city_id:cityInfo.city_id,
      op_mode:cityInfo.op_mode,
      use_mode:cityInfo.use_mode
    }).then(res=>{
      if(res.data.code === 0){
        this.handleCityData(0);
        this.setState({
          isShowOpenCity:false
        })
      }else {
        message.warn('系统提示',res.data.msg)
      }
    })
  }

  //获取城市数据
  handleCityData = (page)=>{
    const self = this;
    axios.get('/city/list',{
      params:{
        page
      }
    }).then(res=>{
      if(res.data.code === 0){
        let data = res.data.data.list.map((item,index)=>{
          item.key = index+1;
          item.id = index+1;
          // delete item.city_admins;
          return item;
        });
        this.setState({
          list:data,
          pagination:pagination(res.data,(current)=>{
            self.params.page = current;
            self.handleCityData(current)
          })
        })
      }
    })
  }

  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      }, {
        title: '城市名称',
        dataIndex: 'name'
      }, {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode == 1 ? '停车点' : '禁停区';
        }
      }, {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(op_mode) {
          return op_mode == 1 ? '自营' : '加盟';
        }
      }, {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      }, {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr) {
          return arr.map((item) => {
            return item.user_name;
          }).join(',');
        }
      }, {
        title: '城市开通时间',
        dataIndex: 'open_time'
      }, {
        title: '操作时间',
        dataIndex: 'update_time',
        render(time){
          return  moment(time).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]
    return (
      <div>
        <Card>
          <FilterForm/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type={"primary"} onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title='开通城市'
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst}}></OpenCityForm>
        </Modal>
      </div>
    )
  }
}

class FilterForm extends React.Component {
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form layout={"inline"}>
        <FormItem label='城市'>
          {
            getFieldDecorator('city_id')(
              <Select style={{width: 100}} placeholder='全部'>
                <Option value=''>全部</Option>
                <Option value='1'>北京市</Option>
                <Option value='2'>天津市</Option>
                <Option value='3'>深圳市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='用车模式'>
          {
            getFieldDecorator('mode')(
              <Select style={{width: 120}} placeholder='全部'>
                <Option value=''>全部</Option>
                <Option value='1'>指定停车点模式</Option>
                <Option value='2'>禁停区模式</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='营运模式'>
          {
            getFieldDecorator('op_mode')(
              <Select style={{width: 80}} placeholder='全部'>
                <Option value=''>全部</Option>
                <Option value='1'>自营</Option>
                <Option value='2'>加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="加盟商授权状态">
          {
            getFieldDecorator('auth_status')(
              <Select
                style={{width: 100}}
                placeholder="全部"
              >
                <Option value="">全部</Option>
                <Option value="1">已授权</Option>
                <Option value="2">未授权</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type='primary' style={{margin: '0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

FilterForm = Form.create({})(FilterForm)

class OpenCityForm extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    const {getFieldDecorator} = this.props.form
    return (
      <Form layout={"horizontal"}>
        <FormItem label='选择城市' {...formItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: '1'
            })(
              <Select style={{width: 100}}>
                <Option value=''>全部</Option>
                <Option value='1'>北京市</Option>
                <Option value='2'>天津市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='营运模式' {...formItemLayout}>
          {
            getFieldDecorator('op_mode', {
              initialValue: '1'
            })(
              <Select style={{width: 100}}>
                <Option value='1'>加盟</Option>
                <Option value='2'>自营</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          {
            getFieldDecorator('use_mode', {
              initialValue: '1'
            })(
              <Select style={{width: 130}}>
                <Option value="1">指定停车点</Option>
                <Option value="2">禁停区</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

OpenCityForm = Form.create({})(OpenCityForm)

export default City
