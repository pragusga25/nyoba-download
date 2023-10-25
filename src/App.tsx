import { useState, ChangeEvent } from 'react'
import './App.css'

function App() {
  const [obj, setObj] = useState({
    url: '',
    token: '',
    contentType: 'application/pdf',
    filename: ''
  })

  const [url, setUrl] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setObj({
      ...obj,
      [name]: value,
    });
  };

  const handleUrlChange = (newUrl: string) => setUrl(newUrl)

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'test.pdf';
    link.click();
  };

  const download = () => {
    const {url, contentType, token, filename} = obj
    fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      "Authorization": `Bearer ${token}`
    },
  })
  .then((response) => response.blob())
  .then((blob) => {
    // Create blob link to download
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      filename,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode?.removeChild(link);
  });
  }

  return (
    <>
      <form>
      <div>
        <label>URL:</label>
        <input
          type="text"
          name="url"
          value={obj.url}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Token:</label>
        <input
          type="text"
          name="token"
          value={obj.token}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Content Type:</label>
        <input
          type="text"
          name="contentType"
          value={obj.contentType}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Filename:</label>
        <input
          type="text"
          name="filename"
          value={obj.filename}
          onChange={handleInputChange}
        />
      </div>
      <button type="button" onClick={download}>
        Download
      </button>
    </form>

    <br/>
    <form>
    <div>
        <label>Url:</label>
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleDownload}>
        Download
      </button>
    </form>
    </>
  );
}

export default App
