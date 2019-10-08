import React, {useState} from "react";
import axios from 'axios';
import { async } from "q";


function App() {

  //This use effect functions runs every time the page loads
  // useEffect( () => {
  //   activateCipher();
  // }, []);

  // Variables and states being set
  const vigenerURL = 'http://localhost:8080/api/cipher/encrypt';
  const [rawtext, setRawText] = useState('');
  const [Key, setKey] = useState('');
  const [encrypt, setEncrypt] = useState(true);
  const [message, setMessage] = useState('Cipher Result');


  // Get text from input 
  const getRawText = e => {
    setRawText(e.target.value);
  }

  const getKey = e => {
    setKey(e.target.value);
  }

  const getEncrypt = e => {
    setEncrypt(e.target.value);
  }

  // Call backend API
  const activateCipher = async () => {

    const response = await axios.post(vigenerURL,{'key': Key, 'rawtext': rawtext, 'encrypt': encrypt}, { headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
    .then(function (response) {
      setMessage(response.data.text);
    })
    .catch(function (error) {
      console.log(error);
    });

    const responseData = response;
  }

  // Set all final values and send them in post request
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
            <input type="text" name="text" placeholder="Enter Text Here" required value={rawtext} onChange = {getRawText}/>
          </div>
          <div>
            <input type="text" name="key" placeholder="Enter Key" required value={Key} onChange = {getKey}/>
          </div>
          <div>
            <select value={encrypt} onChange = {getEncrypt}>
              <option value={true}>Encrypt Text</option>
              <option value={false}>Decrypt Text</option>
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
