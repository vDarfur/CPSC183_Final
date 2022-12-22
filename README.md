# FuzzMe



## Usage

Generate an API KEY at [OpenAI](https://beta.openai.com/) and add it to the `openaiController.js` file.

Install the dependencies

```bash
npm install
```

Run server

```bash
npm start
```

Visit `http://localhost:5000` in your browser.

Note: If you are on a mac and the server won't run, port 5000 might be occupied. To check what process is running, run the following command:
```bash
sudo lsof -i :5000
```
if the Command printed is ControlCe, go into your system preferences and disable airplay