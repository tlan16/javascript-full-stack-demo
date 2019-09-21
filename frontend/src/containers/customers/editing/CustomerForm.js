import React, { Component, useState, useEffect } from 'react';
import { Input } from 'antd';
import Form from '@isomorphic/shared/isomorphic/components/uielements/form';
import Button from '@isomorphic/shared/isomorphic/components/uielements/button';
import Notification from '@isomorphic/shared/isomorphic/components/Notification';
import useReactRouter from 'use-react-router';
import URI from "urijs";

const FormItem = Form.Item;

function CustomerForm (props) {
  const { getFieldDecorator } = props.form;
  const { location, match } = useReactRouter();
  const { params: {id} } = match;
  const { state: fromPagination } = location;
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState({});

  async function fetchCustomer() {
    console.log(id);
    const url = (new URI(`customer/${id}`))
        .absoluteTo(process.env.REACT_APP_API_HOST)
        .toString();

    setIsLoading(true);
    const response = await fetch(url);
    const customers = await response.json();

    setCustomer(customers.items);
    setIsLoading(false);
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  };

  const [confirmDirty, setConfirmDirty] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Notification(
            'success',
            'Received values of form',
            JSON.stringify(values)
        );
      }
    });
  }

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
      !isLoading &&
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label="First Name" hasFeedback>
          {getFieldDecorator('text', {
            rules: [
              {
                required: true,
                message: 'Please input your First Name.',
              },
            ],
          })(<Input name="firstName" id="firstName" value={customer.firstName} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Last Name" hasFeedback>
          {getFieldDecorator('text', {
            rules: [
              {
                required: true,
                message: 'Please input your Last Name.',
              },
            ],
          })(<Input name="lastName" id="lastName" value={customer.lastName} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="E-mail" hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail.',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input name="email" id="email" value={customer.email}/>)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          &nbsp;&nbsp;
          <Button type="default">
            Cancel
          </Button>
        </FormItem>
      </Form>
  );
}

const WrappedCustomerForm = Form.create()(CustomerForm);
export default WrappedCustomerForm;
