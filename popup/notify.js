function getTitle() {
  if (document.getElementById("title").checked) {
    return "my title";
  }
  return null;
}

function getMessage() {
  if (document.getElementById("message").checked) {
    return "my message";
  }
  return null;
}

function getContextMessage() {
  if (document.getElementById("context-message").checked) {
    return "my context message";
  }
  return null;
}

function getEventTime() {
  if (document.getElementById("event-time").checked) {
    return Date.now();
  }
  return null;
}

function getPriority() {
  var chosenPriority = parseInt(document.getElementById("priority").selectedOptions[0].value);
  if (chosenPriority == 0) {
    return null;
  }
  
  return chosenPriority;
}

function getButtons() {
  var chosenButtonCount = parseInt(document.getElementById("button-count").selectedOptions[0].value);
  if (chosenButtonCount == 0) {
    return null;
  }

  var buttons = [];

  for (var i = 0; i < chosenButtonCount; i++) {
    var button = {
      title: "button " + i + " text",
      iconUrl: chrome.extension.getURL("icons/beasts-32.png")
    };
    buttons.push(button);
  }
  return buttons;
} 

function getImage() {
  if (document.getElementById("include-image").checked) {
    return chrome.extension.getURL("snake.jpg");
  }
  return null;
}

function getItems() {
  if (!document.getElementById("item-count").value) {
    return null;
  }
  var chosenItemsCount = parseInt(document.getElementById("item-count").value);

  var items = [];

  for (var i = 0; i < chosenItemsCount; i++) {
    var item = {
      title: "title for item " + i,
      message: "message for item " + i
    };
    items.push(item);
  }
  return items;
}

function getProgress() {
  if (document.getElementById("progress").value) {
    return parseInt(document.getElementById("progress").value);
  }
  return null;
}

function handleError() {
  if (chrome.extension.lastError) {
    document.getElementById("output").textContent = JSON.stringify(chrome.extension.lastError);
  } else {
    document.getElementById("output").textContent = "No error";
  }
}

function createNotification() {
  document.getElementById("output").textContent = "";

  var chosenType = document.getElementById("select-type").selectedOptions[0].value;
  var chosenTitle = getTitle();
  var chosenMessage = getMessage();
  var chosenContextMessage = getContextMessage();
  var chosenEventTime = getEventTime();
  var chosenPriority = getPriority();
  var chosenButtons = getButtons();
  var chosenIsClickable = document.getElementById("is-clickable").checked;
  var chosenImage = getImage();
  var chosenItems = getItems();
  var chosenProgress = getProgress();
  
  var notificationOptions = {
    type: chosenType,
    iconUrl: chrome.extension.getURL("icons/beasts-48.png"),
    isClickable: chosenIsClickable
  };

  if (chosenTitle) {
    notificationOptions.title = chosenTitle;
  }

  if (chosenMessage) {
    notificationOptions.message = chosenMessage;
  }
  
  if (chosenContextMessage) {
    notificationOptions.contextMessage = chosenContextMessage;
  }

  if (chosenPriority) {
    notificationOptions.priority = chosenPriority;
  }

  if (chosenEventTime) {
    notificationOptions.eventTime = chosenEventTime;
  }

  if (chosenButtons) {
    notificationOptions.buttons = chosenButtons;
  }
  
  if (chosenImage) {
    notificationOptions.imageUrl = chosenImage;
  }

  if (chosenItems) {
    notificationOptions.items = chosenItems;
  }

  if (chosenProgress) {
    notificationOptions.progress = chosenProgress;
  }

  chrome.notifications.create(notificationOptions, handleError);
}

var createNotificationButton = document.getElementById("create-notification");
createNotificationButton.addEventListener("click", createNotification);
