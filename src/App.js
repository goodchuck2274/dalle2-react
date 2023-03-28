import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios'

import './App.css';

import { apiKey } from './config';

function App() {

  const [desc, setDesc] = useState('');
  const [keyword, setKeyword] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const apiChatUrl = 'https://api.openai.com/v1/chat/completions'
  const apiImageUrl = 'https://api.openai.com/v1/images/generations'
  let header = {
    'Accept': 'application/json;charset=UTF-8',
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': 'Bearer ' + apiKey
  };

  async function generateKeyword() {
    if (desc) {
      let chatContent = "請幫我用下面這句話「" + desc + "」翻譯成可以在 dall-e-2 生成的英文關鍵字，只要回答英文就好不要前面說明，也不要引號"
      let rowbody1 = {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": chatContent }]
      }
      let _param1 = {
        method: 'POST',
        url: apiChatUrl,
        headers: header,
        data: rowbody1
      };
      setKeyword('');
      setImgUrl('');
      setLoading(true);

      await axios(_param1)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setKeyword(response.data.choices[0].message.content)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  async function generateImage() {
    if (keyword) {
      let rowbody2 = {
        "prompt": keyword,
        "n": 1,
        "size": "1024x1024"
      }
      let _param2 = {
        method: 'POST',
        url: apiImageUrl,
        headers: header,
        data: rowbody2
      };
      setImgUrl('');
      setLoading(true);

      await axios(_param2)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setImgUrl(response.data.data[0].url);
          }
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    clear()
    return () => {
    };
  }, []);

  useEffect(() => {
    generateImage()
    return () => {
    };
  }, [keyword]);

  function clear() {
    setDesc('');
    setKeyword('');
    setImgUrl('');
    setLoading(false);
  }

  let loadingDiv = null;
  let keywordDiv = null;
  let imgDiv = null;
  if (loading) {
    loadingDiv = (
      <CircularProgress />
    )
  } else {
    loadingDiv = null;
  }
  if (keyword) {
    keywordDiv = (
      <Card style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        關鍵字 (系統產生)：{keyword}
      </Card>
    )
  } else {
    keywordDiv = null;
  }
  if (imgUrl) {
    imgDiv = (
      <img src={imgUrl} loading="lazy" style={{ maxWidth: '100%', height: 'auto' }} />
    )
    loadingDiv = null;
  } else {
    imgDiv = null;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            固巧快 AI 繪圖產生器
          </Typography>
        </Toolbar>
      </AppBar>

      <Card style={{ margin: 20, padding: 20 }}>
        <TextField fullWidth
          id="desc"
          label="請輸入想要產生的圖片敘述 (支援中文)"
          value={desc}
          multiline
          rows={2}
          onChange={(event) => {
            setDesc(event.target.value);
          }}
        />

        <Button variant="contained" style={{ marginTop: 10, marginBottom: 10, marginRight: 10 }} onClick={() => {
          generateKeyword();
        }}>產生圖片</Button>
        <Button variant="contained" style={{ marginTop: 10, marginBottom: 10 }} onClick={() => {
          clear();
        }}>清除</Button>
        <br />
        {loadingDiv}
        {keywordDiv}
        {imgDiv}
      </Card>
    </div>
  );
}

export default App;
