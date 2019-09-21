import React, {useState, useEffect} from "react";
import URI from 'urijs'
import useReactRouter from 'use-react-router';
import TableWrapper from './antTable.style';
import Column from "antd/es/table/Column";
import IntlMessages from "@isomorphic/shared/isomorphic/components/utility/intlMessages";
import {Link} from "react-router-dom";

export default () => {
    const { location } = useReactRouter();
    const { state: {current= 1, pageSize= 5} = {}} = location;
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current,
        total: 0,
        pageSize,
        pageSizeOptions: ['5', '10', '15'],
        showSizeChanger: true,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();

        return () => {
            setIsLoading(false);
        }
    }, [setData, pagination.current, pagination.pageSize]);

    async function fetchCustomers() {
        const url = (new URI('customer'))
            .absoluteTo(process.env.REACT_APP_API_HOST)
            .query({
                limit: pagination.pageSize,
                page: pagination.current,
            })
            .toString();

        setIsLoading(true);
        const response = await fetch(url);
        const customers = await response.json();

        setData(customers.items);
        setPagination({
            ...pagination,
            total: customers.totalItems,
        });
        setIsLoading(false);
    }

    function handleTableChange(pagination, filters, sorter) {
        setPagination(pagination)
    }

    return (
        <React.Fragment>
            <TableWrapper
                pagination={pagination}
                defaultPageSize={pagination.pageSize}
                rowKey={record => record.id}
                dataSource={data}
                loading={isLoading}
                onChange={handleTableChange}
            >
                <Column title={'First Name'} dataIndex={'firstName'} key={'firstName'}/>
                <Column title={'Last Name'} dataIndex={'lastName'} key={'lastName'}/>
                <Column title={'Email'} dataIndex={'email'} key={'email'}/>
                <Column
                    title={'Action'}
                    key={'action'}
                    render={(text, record) => {
                        return (
                            <span>
                                <Link to={{pathname: `customer/${record.id}`, state: {fromPagination: pagination}}}>
                                    <IntlMessages id={'table.actions.edit'} />
                                </Link>
                            </span>
                        )
                    }}
                />
            </TableWrapper>
        </React.Fragment>
    )
}