# 固巧快 AI 繪圖產生器

## 使用技術
- [OpenAI DALL-E 2](https://openai.com/product/dall-e-2)
- [OpenAI Chat GPT 3.5](https://chat.openai.com/chat)
- [React](https://zh-hant.reactjs.org/)
- [Create React App](https://create-react-app.dev/)

## 安裝說明
### 取得 OpenAI API Keys

請先至 OpenAI 註冊會員，到網址 [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 取得免費的 API Keys (免費額度視 OpenAI 政策決定)

### Clone Dalle2-React 專案

執行 
```
git clone https://github.com/goodchuck2274/dalle2-react.git
```

### 置換 apiKey

找到檔案 \src\config.js ，將 apiKey 換成自己申請的 Open API Key
```
export const apiKey = 'Your OpenAI apiKey';
```

### 啟動

先執行
```
npm install
```

再執行
```
npm run start
```

就可以在 localhost:3000 ，看到自己的 AI 繪圖產生器

## 簡易說明

### 支援中文

程式會先將中文敘述使用 ChatGPT 轉成英文關鍵字，再用轉出來的英文關鍵字用 DALL-E 2 產生圖片

### Demo 網頁

[https://dalle2-react.goodchuck.com.tw/](https://dalle2-react.goodchuck.com.tw/)

如果不能使用的話，應該就是免費額度用完了