import React, {useState} from "react";
import {AgGridReact} from "ag-grid-react";
import axios from "axios";
import {Button, Col, Form, Input, InputNumber, Row, Table} from "antd";
import {AgAbstractField} from "ag-grid-community";

const columnDefs = [
    {
        title: 'Birth date',
        dataIndex: 'birth_date',
        key: 'birth_date',
        width: 150,
    },
    {
        title: 'File name',
        dataIndex: 'file_name',
        key: 'file_name',
        width: 150
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 150,
        filtered: true,
    },
    {
        title: 'Content',
        dataIndex: 'cv_content',
        key: 'cv_content',
        minWidth: 500,
        // render: (value: string) => {
        //     return value.replace(/[^a-zA-Z ]/g, ".")
        // }
    }
]
export const SearchHaystack: React.FC = () => {
    const [dataResponse, setDataResponse] = useState<any[]>([])

    const onFinish = async (values: any) => {
        console.log("https")
        const formValues = {
           'gender': values?.user.gender,
            'major': values?.user.major,
            'languages': values?.user.languages,
            'skills': values?.user.skills,
        }   

        // setDataResponse(data)
        axios.post('https://13.213.71.142/searchCvAdvance', formValues)
            .then((res: any) => {
                const data = res.data.res
                const finalResponse = data.map((item: any, index: number) => {
                    const subItem = item._source
                    subItem.key = index
                    return subItem
                })
                console.log(finalResponse)
                setDataResponse(finalResponse)
            })
    }
    return <>
        <Row>
            <Col span={12} offset={6} className="fieldset">
                <h1>Haystack</h1>
                <Col span={16} offset={4}>
                    <Form name="nest-messages" onFinish={onFinish}>
                        <Form.Item name={['user', 'gender']} label="Gender">
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['user', 'language']} label="Language">
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['user', 'skills']} label="Skills">
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['user', 'major']} label="Major">
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Col>
        </Row>
        <Row className={"row-table"}>
            <Col span={20} offset={2}>

                <Table
                    columns={columnDefs}
                    dataSource={dataResponse}
                    // loading={}
                />
            </Col>
        </Row>
    </>
}