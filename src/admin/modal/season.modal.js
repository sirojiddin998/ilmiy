import { Modal, Form, DatePicker, Row, Col, Input } from "antd";
import React, { useState } from "react";
import axiosConfig from "../../redux/baseUrl";

const SeasonModal = ({ isModalOpen, setIsModalOpen }) => {

  const [form] = Form.useForm();

  const [start, setStartYear] = useState("") 
  const [end, setEndYear] = useState("") 

  const handleChange = (e) => {
    setStartYear(e[0])
    setEndYear(e[1])

  };

  // console.log(startYear, endYear);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    axiosConfig.post("/season",{start,end,child:[]}).then(res=>{
      console.log("res",{start,end});
      setStartYear("")
      setEndYear("")
      sessionStorage.setItem("yearId", res.data._id)
      setIsModalOpen(false);
    }).catch(err=>{
      console.log("err",err);
    })
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="O'quv yilini qo'shish"
        open={isModalOpen}
        onOk={form.submit}
        okText={"Saqlash"}
        cancelText={"Bekor qilish"}
        closable={false}
        onCancel={handleOk}
        width={800}
      >
        <Form layout="vertical" form={form} onFinish={(a,b)=>handleSubmit(b)} initialValues={{ remember: true }}>
          <Row style={{justifyContent: "space-around", alignItems: "center", }}>
            <Col span={23}>
              <Form.Item name="year" label="O'quv yilini kiriting">
                <DatePicker.RangePicker
                  style={{ width: "100%",}}
                  size="large"
                  picker="year"
                  onChange={(a,b)=>handleChange(b)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default SeasonModal;
