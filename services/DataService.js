let userData = {};

//create a function to help us check our local storage; if user is logged in they have a token which enables them to see content
function checkToken() {
  let result = false;
  let lsData = localStorage.getItem("Token");
  if (lsData && lsData != null) {
    result = true;
  }
  return result;
}

const sendData = async (endpoint, passedInData) => {
  let result = await fetch(`http://localhost:5226/user/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passedInData),
  });

  if (!result.ok) {
    const message = `Error! Try again ${result.status}`;
    throw new Error(message);
  }

  let data = await result.json();
  return data;
};

//use an async and await function to help us resolve a promise
const createAccount = async (createdUser) => {
  let result = await fetch("http://localhost:5226/user/AddUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdUser),
  });

  if (!result.ok) {
    const message = `Error! Try again ${result.status}`;
    throw new Error(message);
  }

  let data = await result.json();
  console.log(data);
};

const Login = async (loginUser) => {
  let result = await fetch("http://localhost:5226/user/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginUser),
  });

  if (!result.ok) {
    const message = `Error! Try again ${result.status}`;
    throw new Error(message);
  }

  let data = await result.json();
  console.log(data);
  return data; //need a return for the handleSubmit function to work
};

const LoggedInData = () => {
  return userData;
};

const AddChoreItem = async (choreItem) => {
  let result = await fetch("http://localhost:5226/chore/AddChoreItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(choreItem),
  });

  if(!result.ok) {
    const message = `Error; try again ${result.status}`;
    throw new Error(message);
  }

  let data = await result.json();
  return data;
};

const GetChoreItems = async () => {
    let result = await fetch("http://localhost:5226/chore/GetChoreItems");
    let data = await result.json();
    return data;
}

const UpdateChoreItems = async (choreItems) => {
    let result = await fetch("http://localhost:5226/chore/UpdateChoreItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(choreItems),
    });

    if(!result.ok){
        const message = `An error has occurred ${result.status}`;
        throw new Error(message);
    }

    let data = await result.json();
    console.log(data);
    return data;
}

const DeleteChoreItem = async (choreItemToDelete) => {
  let result = await fetch(`http://localhost:5226/chore/DeleteChoreItem/${choreItemToDelete}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
  });

  if(!result.ok){
      const message = `An error has occurred ${result.status}`;
      throw new Error(message);
  }

  let data = await result.json();
  console.log(data);
  return data;
}

const GetItemsByCategory = async (Category) => {
  let result = await fetch(`http://localhost:5226/chore/GetItemsByCategory/${Category}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
  });

  if(!result.ok){
      const message = `An error has occurred ${result.status}`;
      throw new Error(message);
  }

  let data = await result.json();
  console.log(data);
  return data;
}

const GetCompletedChoreItems = async () => {
  let result = await fetch("http://localhost:5226/chore/GetCompletedChoreItems", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
  });

  if(!result.ok){
      const message = `An error has occurred ${result.status}`;
      throw new Error(message);
  }

  let data = await result.json();
  console.log(data);
  return data;
}



export { sendData, checkToken, createAccount, Login, LoggedInData, AddChoreItem, GetChoreItems, UpdateChoreItems, DeleteChoreItem, GetItemsByCategory, GetCompletedChoreItems }
