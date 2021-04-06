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

// This function takes in a string (data) and returns it's
// translated value in english.
// It uses a POST request to /translate servlet
async function postTranslate(data) {
  // POST Request
  const response = await fetch("/translator", {
    method: "POST", // Send Post Request to /translate
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Translated value from POST response
  const translatedText = await response.text();

  return translatedText;
}

// This function takes in a string (data) and returns it's
// sentiment value from -1 to 1.
// It uses a POST request to /sentiment servlet
async function postSentiment(data) {
  // POST Request
  const response = await fetch("/sentiment", {
    method: "POST", // Send Post Request to /sentence
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Sentiment score from POST response
  const sentimentScore = await response.text();

  return sentimentScore;
}

// Gets a sentiment value and updates DOM with new element.
async function getSentiment() {
  // Depends on where our value is stored in our index.html
  const userMessage = document.getElementById("user-message").value;

  // Gets our translated message from /translate servlet
  const translatedMessage = await postTranslate(userMessage);

  // Gets our sentiment score from /sentiment servlet
  const sentimentScore = await postSentiment(translatedMessage);

  // This displays our sentimentScore, userMessage and translatedMessage
  displayElements(sentimentScore, userMessage, translatedMessage);
}

// This function displays sentimentScore, originalMessage, scoreResponse, and
// translatedMessage to the "sentiment" div.
function displayElements(sentimentScore, originalMessage, translatedMessage) {
  // Depends on the element id used to display our sentiment
  const sentimentContainer = document.getElementById("sentiment");
  sentimentContainer.innerText = "";

  // Displays sentiment score
  sentimentContainer.appendChild(
    createParagraphElement("Sentiment score: " + sentimentScore)
  );

  // Displays a message based on our sentiment score
  sentimentContainer.appendChild(
    createParagraphElement(getScoreResponse(parseFloat(sentimentScore)))
  );

  // Displays user messsage
  sentimentContainer.appendChild(
    createParagraphElement("Original Message: " + originalMessage)
  );

  // Displays translated Message
  sentimentContainer.appendChild(
    createParagraphElement("Translated Message: " + translatedMessage)
  );
}

// Creates a <p> element containing text.
function createParagraphElement(text) {
  const pElement = document.createElement("p");
  pElement.innerText = text;
  return pElement;
}

// This function returns a message based on sentiment scores
function getScoreResponse(score) {
  // Messages based on score ranges
  //TODO: updated messages to a series of good/bad/netural messages. Make it a random selection.
  const positiveMessages = [
    "Liking the positive energy!!",
    "That should make someone smile.",
    "Killing them with kindness.",
  ];
  const neutralMessages = [
    "Congrats, You acieved a neutral response",
    "This text shouldn't ruffle any feathers.",
    "You're like the swiss, Neutral.",
  ];
  const negativeMessages = [
    "Congrats, this text is sortof negative. If you meant it.",
    "Sometimes you need to get a somber tone across.",
    "Let the frustration out. it's ok.",
  ];

  const randomIndex = Math.round(Math.random() * 3);

  /*
   * ranges:
   *        -1 to -0.2  ==> negative
   *        -0.2 to 0.2 ==> neutral
   *        0.2 to 1    ==> postive
   * */
  if (score >= -0.2) {
    return positiveMessages[randomIndex];
  } else if (score > -0.2 && score < -0.2) {
    return neutralMessages[randomIndex];
  } else {
    return negativeMessages[randomIndex];
  }
}
