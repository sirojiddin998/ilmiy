import { Modal, Form, DatePicker, Row, Col, Input } from "antd";
import React, { useState } from "react";
import axiosConfig from "../../redux/baseUrl";

const FanTogarakFakultetNomiAdd = ({ isModalOpen2, setIsModalOpen2, yearId }) => {

  const [form] = Form.useForm();

  const [stipendiaName, setStipendiaName] = useState("") 

  const handleChange = (e) => {
  };

  // console.log(startYear, endYear);

  const handleOk = () => {
    setIsModalOpen2(false);
  };

  let FacultyId = sessionStorage.getItem("FacultyId")
  let yearId1 = sessionStorage.getItem("yearId")

  // , science_id:`yearId1`, faculty_id:FacultyId, child:[]

  const handleSubmit = (e) => {
    // console.log(e.title);
    setStipendiaName(e.title)
    // console.log(stipendiaName);
    axiosConfig.patch(`/science/${yearId1}`,{title:e.title}).then(res=>{
      console.log(res);

      setIsModalOpen2(false);
    }).catch(err=>{
      console.log(err);
    })
    form.resetFields();
  };

//   console.log(stipendiaName);

  return (
    <div>
      <Modal
        title="Fakultet nomini qo'shish"
        open={isModalOpen2}
        onOk={form.submit}
        okText={"Saqlash"}
        cancelText={"Bekor qilish"}
        closable={false}
        onCancel={handleOk}
        width={800}
      >
        <Form layout="vertical" form={form} onFinish={(a,b)=>handleSubmit(a)} initialValues={{ remember: true }}>
          <Row style={{justifyContent: "space-around", alignItems: "center", }}>
            <Col span={23}>
              <Form.Item name="title" label="Fakultet nomini qo'shish">
              <Input placeholder="Fakultet nomini qo'shish" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default FanTogarakFakultetNomiAdd;
