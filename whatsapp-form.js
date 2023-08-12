const template = document.createElement("template");
template.innerHTML = `
<head>
  <title>Custom Element Example</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>

  <style>
    /* Add styling for your custom element */
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
    }

    button {
      background-color: rgb(97, 206, 112);
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
    }
      </style>
      
    <div>
        <label> Mensaje WhatsApp </label>
        <input type="text" id="input-field" />
        <button id="action-button">Enviar WhatsApp</button>

    </div>

`;

class CustomElement extends HTMLElement {
  constructor() {
    super();

    // Create a shadow DOM for encapsulation
    const shadow = this.attachShadow({ mode: "open" });

    shadow.append(template.content.cloneNode(true));

    // Get references to the input and button elements
    this.inputField = shadow.getElementById("input-field");
    this.actionButton = shadow.getElementById("action-button");

    // Add event listener to the button
    this.actionButton.addEventListener("click", () => {
      this.handleButtonClick();
    });
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    const message = this.getAttribute("message");
    const code = this.getAttribute("code");
    const phone = this.getAttribute("phone");
    const action = this.getAttribute("action");
    this.inputField.value = message;
    this.actionButton.textContent = action;
    console.log(title, message, code, phone, action);
  }

  handleButtonClick() {
    const inputValue = this.inputField.value;
    // Add your custom logic here
    console.log("Input Value:", inputValue);
  }
}

// Define your custom element
customElements.define("whatsapp-form", CustomElement);
