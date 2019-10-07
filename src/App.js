import React, {useEffect, useState} from "react";
import { async } from "q";
import axios from 'axios';


function App() {

  // constructor(props) {

  //   super(props);
  //   this.state = {value: 'coconut'};

  //   this.handleChange = this.handleChange.bind(this);
    
  // }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  const sayHello = () => {
    console.log("hello");
  };

  useEffect( () => {
    activateCipher();
  }, []);

  const vigenerURL = "http://localhost:8080/api/cipher/encrypt";

  const Key = 'test';
  const rawtext = 'she sells sea shells';
  const encrypt = true;

  const [text, setText] = useState("Text");

  const activateCipher = async () => {
    const response = await axios.post(
      vigenerURL,
      { Key: Key, rawtext: rawtext, encrypt: encrypt},
      { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(response.data.text)

    const responseData = await response;
    console.log(responseData);
  }



  return(
    <div>
      <h1 className="">Hello Vigener Cipher</h1>
      <div className="">
        <form>
          <label> Enter Text Here: </label>
          <input type="text" name="text"/>
          <select>
            <option value="true">Encrypt Text</option>
            <option value="false">Decrypt Text</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
        <h1 className=""> Your text has been processed and here is your result: {}</h1>
      </div>
    </div>
  );
}

export default App;
