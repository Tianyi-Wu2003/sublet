import axios from 'axios';
import { ChangeEvent } from 'react';

interface ICloudinaryResponse {
  data: {
    public_id: string;
    // Other properties you expect in the response
  };
  // Other properties you expect in the response
}

function Test() {
  const cloudName = 'de6oupysj';
  const apiKey = `916655838816275`;

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files![0];
    const formData = new FormData();
    const signatureResponse = await axios.get('http://localhost:3000/get');

    formData.append('file', file);
    formData.append('api_key', apiKey);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    formData.append('signature', signatureResponse.data.signature);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    formData.append('timestamp', signatureResponse.data.timestamp);

    const cloudinaryResponse: ICloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      formData,
      {},
    );
    console.log(cloudinaryResponse.data.public_id);
  };

  return (
    <div>
      <h2>Add Image:</h2>
      <input type="file" onChange={handleFile} />
    </div>
  );
}

export default Test;
