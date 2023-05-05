import { useState, useEffect } from "react";
import axios from "../node_modules/axios/index";
import "./App.css";
import iconArrow from "./assets/images/icon-arrow.svg";
import iconLocation from "./assets/images/icon-location.svg";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import Information from "./components/Information";

interface Result {
  as: {
    asn: number;
    domain: string;
    name: string;
    root: string;
    type: string;
  };
  ip: string;
  isp: string;
  location: {
    city: string;
    country: string;
    geonameId: number;
    lat: number;
    lng: number;
    postalCode: string;
    region: string;
    timezone: string;
  };
}

function App() {
  const [response, setResponse] = useState<Result | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState(false);
  const [res, setRes] = useState<Result | undefined | null>(null);

  const customIcon = new Icon({
    iconUrl: iconLocation,
    iconSize: [46, 56],
  });

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //         console.log(position);
  //         console.log(longitude);
  //       },
  //       (error) => console.log(error)
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  useEffect(() => {
    if (searchTerm) {
      getData(searchTerm).then((data) => {
        setResponse(data);
        console.log(data);
        if (response) console.log(response);
      });
    }
  }, [searchTerm]);

  const getData = async (ipAddress: string) => {
    try {
      const { data } = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_2pGePFAxin2J324ezLEsncRzoHixC&ipAddress=${ipAddress}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault;

    if (!searchTerm) {
      setError(true);
    } else {
      if (response) {
        setRes(response);
        setError(false);
      }
    }
  };

  return (
    <>
      <main className="">
        <div className="p-6 md:p-0 lg:pt-2 md:pt-6 pt-[1.625rem] pb-[9.8125rem] md:pb-24 lg:pb-32 flex flex-col items-center justify-center gap-7 md:bg-hero-banner bg-hero-banner-mobile bg-no-repeat bg-cover bg-center">
          <div>
            <h1 className="text-white md:text-[2rem] text-2xl md:leading-[2.375rem] font-bold">
              IP Address Tracker
            </h1>
          </div>

          {/* form */}
          <div className="w-full">
            <form
              className="flex items-center justify-center w-full md:w-auto"
              onSubmit={handleSubmit}
            >
              <div className="w-full md:w-auto flex-1 md:flex-none">
                <input
                  type="text"
                  className={`px-6 md:py-5 py-[1.125rem] rounded-tl-2xl rounded-bl-2xl md:w-[32.875rem] bg-white text-[#1E1E1E] md:text-xl text-base w-full outline-none ${
                    error ? " border-red-500 border-2" : "border-none"
                  }`}
                  value={searchTerm}
                  placeholder="Search for any IP address or domain"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="h-full">
                <button
                  type="submit"
                  aria-label="Search"
                  className="md:p-7 px-6 py-[1.375rem] bg-[#090B15] rounded-tr-2xl rounded-br-2xl grid place-items-center h-full"
                >
                  <img
                    src={iconArrow}
                    alt="Search"
                    aria-hidden="true"
                    className="h-[14px] w-[11px]"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="absolute z-[1000] md:top-[11.75rem] top-[10.5rem] flex justify-center items-center left-0 w-screen">
          <div className="flex flex-col items-center justify-center md:justify-start md:items-start md:flex-row gap-6 md:gap-16 md:pt-[2.375rem] p-6 md:pl-[2.125rem] md:pr-[9.625rem] bg-white rounded-2xl md:pb-10">
            <div>
              <Information
                header="Ip address"
                description={res ? res?.ip : "192.212.174.101"}
              />
            </div>
            <div className="md:border-l-2 border-l-[#969696] md:pl-[34px]">
              <Information
                header="Location"
                description={res ? res?.location?.city : "South San Gabriel"}
              />
            </div>
            <div className="md:border-l-2 border-l-[#969696] md:pl-[34px]">
              <Information
                header="Timezone"
                description={`UTC ${res ? res?.location?.timezone : "-07:00"}`}
              />
            </div>
            <div className="md:border-l-2 border-l-[#969696] md:pl-[34px]">
              <Information
                header="Isp"
                description={res ? res?.isp : "Southern California Edison"}
              />
            </div>
          </div>
        </div>

        <div id="map" className="min-h-[50vh] w-screen">
          <MapContainer
            center={[
              res ? res?.location.lat : 34.04915,
              res ? res?.location.lng : -118.09462,
            ]}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                res ? res?.location.lat : 34.04915,
                res ? res?.location.lng : -118.09462,
              ]}
              icon={customIcon}
            ></Marker>
          </MapContainer>
        </div>
      </main>
    </>
  );
}

// attribution={osm.maptiler.attribution}
// url={osm.maptiler.url}

// latitude 34.04915
// longitude -118.09462

export default App;
