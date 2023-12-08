/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface House extends Document {
  _id: string;
  owner: string;
  address: string;
  description: string;
  bedroom: number;
  bathroom: number;
  startDate: Date;
  endDate: Date;
  price: number;
  picture1: string;
  picture2: string;
}

interface User extends Document {
  username: string;
  password: string;
  email: string;
  phone: number;
}
const CLOUD_NAME = 'de6oupysj';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [houses, setHouses] = useState<House[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [bedroom, setBedroom] = useState(1);
  const [bathroom, setBathroom] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [address, setAddress] = useState('');
  const [requestOwner, setRequestOwner] = useState<User | null>(null);

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
    const fetchHouses = async () => {
      try {
        const response = await axios.get<House[]>(
          'http://localhost:3000/api/houses',
        );
        setHouses(response.data);
      } catch (err) {
        alert('There is a problem, please try again.');
      }
    };

    const intervalId = setInterval(() => {
      fetchHouses();
      checkLoginStatus();
    }, 5000);
    fetchHouses();
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/account/logout',
        {},
        {
          withCredentials: true,
        },
      );
      setUser('');
    } catch (err) {
      alert('There is a problem with logout.');
    }
  };
  const findUserContact = async () => {
    try {
      const response = await axios.get<User>(
        `http://localhost:3000/account/user/${selectedHouse!.owner}`,
        {},
      );
      setRequestOwner(response.data);
    } catch (err) {
      alert('Cannot find user contact.');
    }
  };

  function handleSelect(house: House) {
    setSelectedHouse(house);
    findUserContact();
  }

  const queryFetchHouse = async () => {
    try {
      const response = await axios.get<House[]>(
        'http://localhost:3000/api/houses/filters',
        {
          params: {
            price_min: priceMin,
            price_max: priceMax,
            bedroom,
            bathroom,
            start_date: startDate,
            end_date: endDate,
            address,
          },
        },
      );
      setHouses(response.data);
    } catch (err) {
      alert('There is a problem, please try again.');
    }
  };

  function viewPhoto(public_id: string) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_100/${public_id}.jpg`;
  }

  return (
    <div className=" min-h-screen p-4 mx-auto bg-sky-50 h-screen flex-col">
      <div className="p-4 mx-auto bg-sky-400 rounded text-white flex">
        <p className=" text-3xl">Marketplace</p>
        <div>
          {isLoggedIn && (
            <div className=" absolute right-10">
              <p>Hi {user}! </p>
              <button onClick={handleLogout} className=" text-sky-200">
                {' '}
                Log out
              </button>
              <p className="m-3 mt-5">
                <Link to="../upload" className="text-blue-700">
                  Upload
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className=" grid grid-flow-col h-full">
        <div className=" col-start-1 col-end-1 flex overflow-hidden">
          <div className=" overflow-y-scroll">
            {!isLoggedIn && (
              <Link to="../login" className=" text-blue-800">
                <button className="w-full mt-4 h-12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 border border-blue-500 hover:border-transparent rounded">
                  Log in to view details
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <div className=" w-full mt-4 border-4 p-2 border-sky-400 rounded">
                <form className="">
                  <label>
                    Price:
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      className="mr-3 ml-3 w-14 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
                    />
                  </label>
                  <label>
                    -
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      className="ml-3 w-14 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
                    />
                  </label>
                  <br />

                  <label>
                    Bedrooms:
                    <input
                      type="number"
                      value={bedroom}
                      onChange={(e) => setBedroom(parseInt(e.target.value, 10))}
                      className="mr-3 ml-3 w-10 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
                    />
                  </label>
                  <label>
                    {' '}
                    Bathrooms:
                    <input
                      type="number"
                      value={bathroom}
                      onChange={(e) =>
                        setBathroom(parseInt(e.target.value, 10))
                      }
                      className="ml-3 w-10 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
                    />
                  </label>
                  <br />

                  <label>
                    Date:
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="ml-3 mr-3 w-24 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
                    />
                  </label>
                  <label>
                    -
                    <input
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="ml-3 w-24 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
                    />
                  </label>
                  <br />

                  <label>
                    Address:
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="ml-3 bg-gray-50 border border-gray-300 text-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 "
                    />
                  </label>
                  <br />
                  <button
                    type="button"
                    onClick={queryFetchHouse}
                    className=" mt-2 p-1 right-20 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 border border-blue-500 hover:border-transparent rounded"
                  >
                    Search
                  </button>
                </form>
              </div>
            )}

            {houses.map((house) => (
              <div
                className=" mt-4 border border-blue-800 rounded"
                key={house._id}
              >
                <button
                  className="w-full h-full text-left py-5 px-2 text-blue-400"
                  type="button"
                  onClick={() => handleSelect(house)}
                >
                  <div>{house.address}</div>
                  <div>
                    {house.bedroom}b{house.bathroom}b
                  </div>
                  <div>
                    {new Date(house.startDate).toLocaleDateString()} -
                    {new Date(house.endDate).toLocaleDateString()}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-start-2 col-end-9">
          {isLoggedIn && selectedHouse && (
            <>
              <div className=" mt-4 border h-full w-full p-4 bg-neutral-100 rounded">
                <h3 className="mb-2 font-semibold text-3xl text-gray-800">
                  address: {selectedHouse.address}
                </h3>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  price: {selectedHouse.price}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  description: {selectedHouse.description}
                </p>
                {selectedHouse.picture1 && (
                  <img
                    className="rounded-t-lg max-h-96"
                    src={viewPhoto(selectedHouse.picture1)}
                    alt=""
                  />
                )}
                {requestOwner?.phone && (
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    phone: {requestOwner.phone}
                  </p>
                )}
                {requestOwner?.email && (
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    email: {requestOwner.email}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
