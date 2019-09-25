import React from 'react'
import {Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd'
import axios from 'axios'
import {pagination} from "../../utils/util";

const FormItem = Form.Item;
const Option = Select.Option;
class Order extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      orderInfo:{},
      orderConfirmVisible:false
    }
  }
  componentWillMount(){
    this.requestList();
  }
  params = {
    page:1
  }
  requestList = (page)=>{
    const self = this;
    axios.get('/order/list',{
      params:{
        page:self.params.page-1
      }
    }).then(res=>{
      let data = res.data;
      if(data.code == '0'){
        let list = data.data.list.map((item,index)=>{
          item.key = index;
          return item;
        })
        this.setState({
          list,
          pagination:pagination(data,(current)=>{
            self.params.page = current;
            self.requestList();
          })
        })
      }
    })
  }
  render(){
    const columns = [
      {
        title:'订单编号',
        dataIndex:'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance){
          return distance/1000 + 'Km';
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span: 19}
    }
    return(
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop:10}}>
          <Button>订单详情</Button>
          <Button>结束订单</Button>
        </Card>
        <Table
          bordered
          columns={columns}
          dataSource={this.state.list}
          pagination={this.state.pagination}
        />
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
        <FormItem label='订单时间'>
          {
            getFieldDecorator('start_time')(
               <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
            )
          }
          {
            getFieldDecorator('end_time')(
              <DatePicker style={{marginLeft:10}} showTime format='YYYY-MM-DD HH:mm:ss' />
            )
          }
        </FormItem>
        <FormItem label="订单状态">
          {
            getFieldDecorator('order_status')(
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

FilterForm = Form.create({})(FilterForm);

export default Order;
