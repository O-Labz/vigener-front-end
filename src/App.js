import React, {useEffect, useState} from "react";
import axios from 'axios';


function App() {

  // useEffect( () => {
  //   activateCipher();
  // }, []);

  const vigenerURL = 'http://localhost:8080/api/cipher/encrypt';

  // const Key = 'test';
  // const rawtext = 'she sells sea shells';
  // const encrypt = true;


  const [value, setValue] = useState('');
  const [rawtext, setRawText] = useState('');
  const [Key, setKey] = useState('');
  const [encrypt, setEncrypt] = useState('');
  const [message, setMessage] = useState('');


  const activateCipher = async () => {
    const response = await axios.post(vigenerURL, 
      { Key: Key, rawtext: rawtext, encrypt: encrypt},{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error);
    });

    const responseData = response;
    console.log(responseData);
  }


  const getRawText = e => {
    setRawText(e.target.value);
  }

  const getKey = e => {
    setKey(e.target.value);
  }

  const getEncrypt = e => {
    setEncrypt(e.target.value);
  }


  return(

    <div>
      <h1 className="">Hello Vigener Cipher</h1>
      <div className="">
        <form>
          <label> Enter Text Here: </label>
          <div>
            <input type="text" name="text" value={rawtext} onChange = {getRawText}/>
          </div>
          <div>
            <input type="text" name="key" value={getKey}/>
          </div>
          <div>
            <select onChange = {getEncrypt}>
              <option value="true">Encrypt Text</option>
              <option value="false">Decrypt Text</option>
            </select>
          </div>
          <div> <input type="submit" value="Submit" /> </div>
        </form>
        <h1 className=""> Your text has been processed and here is your result: {}</h1>
      </div>
    </div>
  );
}

export default App;
