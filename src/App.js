import React, {useState} from "react";
import axios from 'axios';


function App() {

  // useEffect( () => {
  //   activateCipher();
  // }, []);

  const vigenerURL = 'http://localhost:8080/api/cipher/encrypt';

  // const Key = 'test';
  // const rawtext = 'she sells sea shells';
  // const encrypt = true;

  const [rawtext, setRawText] = useState('');
  const [Key, setKey] = useState('');
  const [encrypt, setEncrypt] = useState(false);
  const [message, setMessage] = useState('meat loaf');

  const getRawText = e => {
    setRawText(e.target.value);
    console.log(rawtext)
  }

  const getKey = e => {
    setKey(e.target.value);
  }

  const getEncrypt = e => {
    setEncrypt(e.target.value);
  }

  const activateCipher = async () => {
    const response = await axios.post(vigenerURL, 
      { Key: Key, rawtext: rawtext, encrypt: encrypt},{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
    .then(response => {
      console.log(response)
      setMessage(response.data.text);
    })
    .catch(error => {
      console.log(error);
    });

    const responseData = response;
    console.log(responseData);
  }

  const callVigenerApi = e => {
    e.preventDefault();
    setEncrypt(encrypt);
    setRawText(rawtext);
    setKey(Key);
    activateCipher();
  }


  return(

    <div className="container">
      <h1 className="Viginer-Header">Omri's Vigener Cipher</h1>
      <div className="form-container">
        <form className="Viginer-Form" onSubmit={callVigenerApi}>
          <div>
            <input type="text" name="text" placeholder="Enter Text Here" value={rawtext} onChange = {getRawText}/>
          </div>
          <div>
            <input type="text" name="key" placeholder="Enter Key" value={Key} onChange = {getKey}/>
          </div>
          <div>
            <select value={encrypt} onChange = {getEncrypt}>
              <option value={false}>Encrypt Text</option>
              <option value={true}>Decrypt Text</option>
            </select>
          </div>
          <div> <input type="submit" value="Submit" /> </div>
        </form>
      </div>
      <h1 className="results"> Your text has been processed and here is your result: {message}</h1>
    </div>
  );
}

export default App;
