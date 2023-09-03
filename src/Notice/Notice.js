import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom"

import {
    Button,
    Card,
    CardBody,
    CardTitle, Form,
} from "reactstrap";
import base64 from "base-64";

const Notices = () => {
    const navigate = useNavigate();
    const { index } = useParams();

    const [notice, setNotice] = useState([]);
    const [email, setEmail] = useState([]);

    useEffect(() => {
        fetchNoticeByIndex();
    }, []);

    const fetchNoticeByIndex = async () => {
        try {
            // 서버에서 데이터 가져오기
            const response = await fetch(`http://localhost:8080/notice/${index}`);
            const data = await response.json();

            setNotice(data);

            //const jwtToken = localStorage.getItem('token');
            const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQCIsInJvbGUiOiJndWVzdCIsIm15TmFtZSI6IuuwqeuCqO2YhCIsImV4cCI6MTY5MzU2MjY2MSwiaWF0IjoxNjkzNDc2MjYxfQ.MSJzAcQfOxHYTEsV8klR7NouDmQj5fTMq198GFkstOs";
            const payload = jwtToken.split('.')[1];
            const dec = JSON.parse(base64.decode(payload));

            setEmail(dec.sub);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log(email);
    const handleUpdate = async event => {
        localStorage.setItem('notice_id', notice.id);
        localStorage.setItem('title', notice.title);
        localStorage.setItem('content', notice.content);

        navigate("/update");
    };

    const handleDelete = async event => {
        const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (shouldDelete) {
            await fetch(`http://localhost:8080/notice/delete/${notice.id}`);
            navigate("/alerts");
        }
    };

    return (
        <div>
            <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-2 mt-2 d-flex align-items-center">
                    <h2 className="flex-grow-1 m-0">&nbsp;{notice.title}</h2>
                </CardTitle>

                <CardBody>
                    <div>{notice.content}</div>
                    {notice.userID == email && (
                        <Form className="d-flex" onSubmit={handleUpdate}>
                            <Button type="submit" className="btn mr-2">수정</Button>
                        </Form>
                    )}
                    {notice.userID == email && (
                        <Form className="d-flex" onSubmit={handleDelete}>
                            <Button type="submit" className="btn">삭제</Button>
                        </Form>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default Notices;