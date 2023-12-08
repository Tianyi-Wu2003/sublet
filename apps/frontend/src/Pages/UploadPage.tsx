import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface ICloudinaryResponse {
  data: {
    public_id: string;
  };
}

const API_KEY = '916655838816275';
const CLOUD_NAME = 'de6oupysj';

function UploadPage() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState('');

  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [picture1, setPicture1] = useState('');
  const [picture2, setPicture2] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get<{
          isloggedin: boolean;
          username: string;
        }>('http://localhost:3000/api/isloggedin', {
          withCredentials: true,
        });
        setIsLoggedIn(response.data.isloggedin);
        setUser(response.data.username);
      } catch (err) {
        alert('There is a problem, please try again.');
      }
    };
    checkLoginStatus();
  }, []);

  const handleUpload = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/houses/add',
        {
          owner: user,
          address,
          description,
          bedroom,
          bathroom,
          price,
          startDate,
          endDate,
          picture1,
          picture2,
        },
        {
          withCredentials: true,
        },
      );
      navigate('/');
    } catch (err) {
      alert('Please try another upload.');
    }
  };
  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      const file = e.target.files![0];
      const formData = new FormData();
      const signatureResponse = await axios.get(
        'http://localhost:3000/account/get',
      );

      formData.append('file', file);
      formData.append('api_key', API_KEY);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      formData.append('signature', signatureResponse.data.signature);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      formData.append('timestamp', signatureResponse.data.timestamp);

      const cloudinaryResponse: ICloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        formData,
        {},
      );
      setPicture1(cloudinaryResponse.data.public_id);
    } catch (err) {
      console.log('Error handling file:');
    }
  };

  return (
    <div className="bg-neutral-100 flex h-screen justify-center items-center">
      <div className="bg-sky-50 rounded">
        <h2 className="text-4xl text-sky-700 justify-center m-4 w-96">
          Sublet available
        </h2>
        <form>
          <label className="text-gray-600 text-xl m-3 ">
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 block"
            />
          </label>
          <br />
          <label className="text-gray-600 text-xl m-3 ">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 block"
            />
          </label>
          <br />
          <label className="text-gray-600 text-xl m-3 ">
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="ml-3 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
            />
          </label>
          <br />
          <div className=" flex">
            <label className="text-gray-600 text-xl m-3 ">
              Bedroom:
              <input
                type="number"
                value={bedroom}
                onChange={(e) => setBedroom(Number(e.target.value))}
                className="ml-3 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
              />
            </label>
            <label className="text-gray-600 text-xl m-3 ">
              Bathroom:
              <input
                type="number"
                value={bathroom}
                onChange={(e) => setBathroom(Number(e.target.value))}
                className="ml-3 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
              />
            </label>
          </div>
          <div className="flex -mt-3">
            <label className="text-gray-600 text-xl m-3 ">
              Start Date:
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="ml-3 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
              />
            </label>
            <label className="text-gray-600 text-xl m-3 ">
              End Date:
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="ml-3 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
              />
            </label>
          </div>
          <br />
          <label className="text-gray-600 text-xl m-3">
            Picture:
            <input type="file" onChange={handleFile} />
          </label>
          <button
            type="button"
            onClick={handleUpload}
            className="w-full mt-4 h-12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 border border-blue-500 hover:border-transparent rounded"
          >
            Upload
          </button>
          <Link to="../" className=" text-blue-800">
            <button className="w-full mt-4 h-12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 border border-blue-500 hover:border-transparent rounded">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
