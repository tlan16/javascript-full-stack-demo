import React, {useState, useEffect} from 'react';
import {Input, Select} from 'antd';
import Form from '@isomorphic/shared/isomorphic/components/uielements/form';
import Button from '@isomorphic/shared/isomorphic/components/uielements/button';
import Notification
  from '@isomorphic/shared/isomorphic/components/Notification';
import useReactRouter from 'use-react-router';
import URI from "urijs";

const FormItem = Form.Item;
const {Option} = Select;

function CustomerForm(props) {
  const {getFieldDecorator} = props.form;
  const {history, location, match} = useReactRouter();
  const {params: {id}} = match;
  const {state: {fromPagination}} = location;
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState({});

  async function fetchCustomer() {
    const url = (new URI(`customer/${id}`))
      .absoluteTo(process.env.REACT_APP_API_HOST)
      .toString();

    setIsLoading(true);
    const response = await fetch(url);
    const customer = await response.json();

    setCustomer(customer);
    setIsLoading(false);
  }

  async function saveCustomer(customer) {
    const url = (new URI(`customer/${id}`))
      .absoluteTo(process.env.REACT_APP_API_HOST)
      .toString();

    setIsLoading(true);
    const response = await fetch(url, {
      method: 'PUT',
      headers: [
        ["Content-Type", "application/json"],
        ["Accept", "application/json"],
      ],
      body: JSON.stringify(customer)
    });

    setCustomer(await response.json());
    setIsLoading(false);
  }

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 14},
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

  function navigateToCustomersListingPage() {
    history.push('/dashboard/customers', {pagination: fromPagination});
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        if (props.form.isFieldsTouched()) {
          await saveCustomer(values);
        }
        Notification(
          'success',
          'Customer updated.',
        );
        navigateToCustomersListingPage();
      } else {
        Notification(
          'error',
          'Please check form input(s)',
        );
      }
    });
  }

  useEffect(() => {
    fetchCustomer();

    return () => {
      setIsLoading(false);
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem {...formItemLayout} label="First Name" hasFeedback>
        {getFieldDecorator('firstName', {
          rules: [
            {
              required: true,
              message: 'Please input your First Name.',
            },
          ],
          initialValue: customer.firstName,
        })(<Input name="firstName" id="firstName" disabled={isLoading}/>)}
      </FormItem>

      <FormItem {...formItemLayout} label="Last Name" hasFeedback>
        {getFieldDecorator('lastName', {
          rules: [
            {
              required: true,
              message: 'Please input your Last Name.',
            },
          ],
          initialValue: customer.lastName,
        })(<Input name="lastName" id="lastName" disabled={isLoading}/>)}
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
          initialValue: customer.email,
        })(<Input name="email" id="email" disabled={isLoading}/>)}
      </FormItem>

      <FormItem {...formItemLayout} label="Title" hasFeedback>
        {getFieldDecorator('title', {
          initialValue: customer.title,
        })(<Input name="title" id="title" disabled={isLoading}/>)}
      </FormItem>

      <FormItem {...formItemLayout} label="Gender" hasFeedback>
        {getFieldDecorator('gender', {
          rules: [
            {
              required: true,
              message: 'Please select your Gender.',
            },
          ],
          initialValue: customer.gender,
        })(
          <Select name="gender" id="gender" disabled={isLoading}>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        )}
      </FormItem>

      <FormItem {...formItemLayout} label="Date of Birth" hasFeedback>
        {getFieldDecorator('dob', {
          rules: [
            {
              required: true,
              message: 'Please select your Date of Birth.',
            },
          ],
          initialValue: customer.dob,
        })(<Input type={'date'} name="dob" id="dob" disabled={isLoading}/>)}
      </FormItem>

      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          Save
        </Button>
        &nbsp;&nbsp;
        <Button type="default" onClick={navigateToCustomersListingPage}>
          Cancel
        </Button>
      </FormItem>
    </Form>
  );
}

const WrappedCustomerForm = Form.create()(CustomerForm);
export default WrappedCustomerForm;
