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
    const [isLoading, setIsLoading] = useState(true);

    async function fetchCustomers() {
        const url = (new URI('customer'))
            .absoluteTo(process.env.REACT_APP_API_HOST)
            .toString();

        setIsLoading(true);
        const response = await fetch(url);
        const customers = await response.json();

        setData(customers);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCustomers();

        return () => {
            setIsLoading(false);
        }
    }, [setData]);

    return (
        <React.Fragment>
            <TableWrapper
                pagination={false}
                dataSource={data}
                columns={columns}
                loading={isLoading}
            />
        </React.Fragment>
    )
}