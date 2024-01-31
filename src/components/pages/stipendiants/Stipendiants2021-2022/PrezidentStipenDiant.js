import React, { useState, useEffect } from "react";
import { Card } from 'antd';
import { Link } from "react-router-dom";
import axiosConfig from "../../../../redux/baseUrl";
const { Meta } = Card;

const PresidentStipendiant = () => {

    const [data, setData] = useState([])
    let season = sessionStorage.getItem("yearId")
    let stipend = sessionStorage.getItem("stipendNameId")
    const getAllStipend = () => {
        axiosConfig.post("/students", { season, stipend }).then(res => {
            // console.log("mana res", res.data);
            setData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {
        getAllStipend()
    }, [])

    return (
        <div style={{ marginTop: "200px" }} className="container">
            <h3 style={{ textAlign: "center" }}>Iqtidorli talabalar ro'yxati</h3>
            <div className="row">
                {
                    data?.map((item, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mt-3 mb-3">
                            <Link style={{
                                width: 240,
                            }} className="shadow" to={`/stipendiants/students/detail/${item._id}`}>
                                <Card
                                    hoverable
                                    style={{
                                        width: 240,
                                    }}
                                    cover={<img alt="example" src={`https://ilmiyapi.adu.uz/${item.image}`} />}
                                >
                                    <Meta style={{ textDecoration: "none" }} title={item.fullname} />
                                </Card>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PresidentStipendiant