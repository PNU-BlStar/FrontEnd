import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import { Button } from '@mui/material';
import { Input } from "antd"
import axios from "axios";

//화면의 중앙에 위치시킴
const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const CreateListDiv = styled.div`
  padding: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const { TextArea } = Input

function PostUpdatePage(props) {

    const [data, setData] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState("");

    const {postId} = useParams();
    const url = "http://localhost:8080/api/posts/"+postId;

    const onAddWrite = () => {
    }



    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setData(res.data);
                setTitle(res.data.title);
                setContent(res.data.content);
            })
    }, []);

    function onUpdate() {
        axios.put(url,
            JSON.stringify({
                title: title,
                content: content
            }),
            {
                headers:
                    {"Content-Type": 'application/json'}
            }).then((res) => {
            alert("글을 수정하였습니다");
            console.log(res.data);
            window.location.href = '/main';
        }).catch(error => {
            console.log("실패");
        });
    }

    function onDelete() {
        axios.delete(url)
            .then((res) => {
            alert("글을 삭제하였습니다");
            console.log(res.data);
            window.location.href = '/main';
        }).catch(error => {
            console.log("글 삭제에 실패하였습니다.");
        });
    }
    if (data) {
        return (
            <Wrapper>
                <Container>
                    <TextArea
                        type="text" value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        autoSize={{minRows: 1, maxRows: 1}}/>
                    <TextArea
                        type="text" value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        autoSize={{minRows: 1, maxRows: 1}}/>


                    <Button
                        type="submit"
                        variant="outlined"
                        sx={{ //css 적용
                            mt: 3,
                            pr: 11,
                            pl: 11,
                            color: 'white',
                            border: '1px solid skyblue',
                            borderRadius: '10px',
                            backgroundColor: 'skyblue',
                            // "&.Mui[mui이름]-root:[event 속성]" : {}로 기본적으로 적용된 css를 변경시킬 수 있다.
                            // "&.MuiButton-root:hover" : {}로 기본적으로 탑재되어있는 css를 바꿈
                            "&.MuiButton-root:hover": {
                                color: 'skyblue',
                                borderColor: 'skyblue'
                            }
                        }}
                        onClick={onUpdate}>글 수정하기
                    </Button>

                    <Button
                        type="button"
                        variant="outlined"
                        sx={{ //css 적용
                            mt: 3,
                            pr: 11,
                            pl: 11,
                            color: 'white',
                            border: '1px solid skyblue',
                            borderRadius: '10px',
                            backgroundColor: 'skyblue',
                            // "&.Mui[mui이름]-root:[event 속성]" : {}로 기본적으로 적용된 css를 변경시킬 수 있다.
                            // "&.MuiButton-root:hover" : {}로 기본적으로 탑재되어있는 css를 바꿈
                            "&.MuiButton-root:hover": {
                                color: 'skyblue',
                                borderColor: 'skyblue'
                            }
                        }}
                        onClick={onDelete}>삭제하기</Button>

                </Container>
            </Wrapper>
        );
    }
}

export default PostUpdatePage;