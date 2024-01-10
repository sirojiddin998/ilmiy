import React, { useRef, useState } from 'react';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile, getAllStudenData } from '../../redux/reducers/profile.store';
import axiosConfig from '../../redux/baseUrl';

const PatentsList = () => {

    const [data, setData] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()


    let year = sessionStorage.getItem("patentId")
    const getAllPatents = () => {
        axiosConfig.post("/patents/all", {year}).then(res => {
            // console.log("bu res",res.data);
            // console.log("bu year",year);
            setData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getAllPatents()
    }, [])


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),

        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),

        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const deleteStudent = (data) => {
        console.log(data);
        axiosConfig.delete(`patents/${data}`).then(res=>{
            console.log(res);
            getAllPatents()
        }).catch(err=>{
            console.log(err);
        })
        // message.success("Talaba o'chirildi")
        // dispatch(getAllStudenData())
    }

    const columns = [
        {
            title: 'FIO',
            dataIndex: 'fullname',
            key: 'fullname',
            width: '30%',
            ...getColumnSearchProps('fullname'),
            render: (text, row) => (
                <a href={`http://localhost:8080/${row.dgulink}`} target='_blank' 
                    style={{ color: 'blue' }}
                >
                   {row.fullname}
                </a>
            ),
        },
        {
            title: "Foydalanilgan material",
            dataIndex: 'library',
            key: 'library',
            width: '20%',
            ...getColumnSearchProps('library'),
        },
        {
            title: "Berilgan sana",
            dataIndex: 'date',
            key: 'date',
            width: '20%',
            ...getColumnSearchProps('date'),
        },
        {
            title: 'Qayd raqamlari',
            dataIndex: 'dgu',
            key: 'dgu',
            width: '20%',
            ...getColumnSearchProps('dgu'),
            //   sorter: (a, b) => a.address.length - b.address.length,
            //   sortDirections: ['descend', 'ascend'],
        },
        {
            title: "O'chirish",
            dataIndex: 'cartItem',
            key: 'cartItem',
            width: '20%',
            render: (text, row) => (
                <p
                    style={{ color: 'red', cursor:"pointer"}}
                    onClick={() => {
                        deleteStudent(row._id)
                    }}
                >
                    O'chirish
                </p>
            ),
        },
    ];
    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <h4>{year}-chi yilgi guvohnomalar</h4>
            <hr />
            <Table rowKey={(record) => record._id} columns={columns} dataSource={data} />
        </div>
    );
}

export default PatentsList; 