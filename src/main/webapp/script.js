// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

// Does Post request to get sentiment score
async function postSentiment(data) {
  // TODO: We want to get our message from our translation servlet in the future

  // POST Request
  const response = await fetch("/sentiment", {
    method: "POST", // Send Post Request to /sentence
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Sentiment value from POST response
  const sentiment = await response.text();

  return sentiment;
}

// Gets a sentiment value and updates DOM with new element.
async function getSentiment() {
  // Depends on where our value is stored in our index.html
  // TODO: This value should be updated to get our message from our translation servlet.
  const data = document.getElementById("message").value;

  // Gets our sentiment vaue from POST Request
  const sentiment = await postSentiment(data);

  // Depends on the element id used to display our sentiment
  const sentimentContainer = document.getElementById("sentiment");
  sentimentContainer.innerText = "";

  sentimentContainer.appendChild(
    createParagraphElement("Sentiment score: " + sentiment)
  );

  sentimentContainer.appendChild(
    createParagraphElement(getMessage(parseFloat(sentiment)))
  );
}

// Creates a <p> element containing text.
function createParagraphElement(text) {
  const pElement = document.createElement("p");
  pElement.innerText = text;
  return pElement;
}

// This gets a message value based on sentiment scores
function getMessage(score) {
  // Messages based on score ranges
  //TODO: update messages to be something more readable
  const messages = ["Negative", "Neutral", "Positive"];

  /*
   * ranges:
   *        -1 to -0.2  ==> negative
   *        -0.2 to 0.2 ==> neutral
   *        0.2 to 1    ==> postive
   * */
  if (score <= -0.2) {
    return messages[0];
  } else if (score > -0.2 && score < -0.2) {
    return messages[1];
  } else {
    return messages[2];
  }
}
