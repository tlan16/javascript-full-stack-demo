import React, {useState, useEffect} from "react";
import URI from 'urijs'
import TableWrapper from './antTable.style';

const columns = [
    {title: 'First Name', dataIndex: 'firstName', key: 'firstName'},
    {title: 'Last Name', dataIndex: 'lastName', key: 'lastName'},
    {title: 'Email', dataIndex: 'email', key: 'email'},
];

export default () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
        pageSize: 5,
        pageSizeOptions: [5, 10, 15],
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
                columns={columns}
                loading={isLoading}
                onChange={handleTableChange}
            />
        </React.Fragment>
    )
}