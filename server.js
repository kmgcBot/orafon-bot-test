//const functions = require('firebase-functions');
const request = require('request');
const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors({ origin: true }));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const { WebhookClient, Payload } = require("dialogflow-fulfillment");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/serv",async (req, res) => {
  const agent = await new  WebhookClient({ request: req, response: res });
  const flexMessage = {
    type: "template",
    altText: "this is a carousel template",
    template: {
      type: "carousel",
      actions: [],
      columns: [
        {
          thumbnailImageUrl:
            "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          title: "Title",
          text: "Text",
          actions: [
            {
              type: "message",
              label: "Action 1",
              text: "Action 1",
            },
            {
              type: "message",
              label: "Action 2",
              text: "Action 2",
            },
          ],
        },
        {
          thumbnailImageUrl:
            "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          title: "Title",
          text: "Text",
          actions: [
            {
              type: "message",
              label: "Action 1",
              text: "Action 1",
            },
            {
              type: "message",
              label: "Action 2",
              text: "Action 2",
            },
          ],
        },
      ],
    },
  };
  let image = {
    type: "image",
    originalContentUrl:
      "https://cdn6.f-cdn.com/contestentries/1458359/21383270/5c0fd7001d5ad_thumb900.jpg",
    previewImageUrl:
      "https://cdn6.f-cdn.com/contestentries/1458359/21383270/5c0fd7001d5ad_thumb900.jpg",
    animated: false,
  };

  function weight(agent) {
    //  let payload = new Payload(agent.LINE, flexMessage, { sendAsMessage: true });
    // agent.add(payload);
    agent.add("นำหนัก " + agent.parameters.weight + " แล้วส่วนสูงละ ");
  }

  function img(agent) {
    let payload = new Payload(agent.LINE, image, { sendAsMessage: true });
    agent.add(payload);
  }

  function height(agent) {
    agent.add("สูง " + agent.parameters.height );
  }

async function flex(agent) {
    let payload = await new Payload(agent.LINE, flexMessage, { sendAsMessage: true });
    agent.add(payload);
  }
  function test(agent) {
   
    agent.add("เชื่อม api ได้จ้า");
  }

  let intentMap = new Map();

  intentMap.set("Askweight", weight);
  intentMap.set("img", img);
  intentMap.set("Askheight", height);
  intentMap.set("flex", flex);
  intentMap.set("test", test);
  agent.handleRequest(intentMap);
});
app.get('/hello',(req,res)=>{
 
    res.send('message from api ')
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server listen on port 3000`);
}) 
   