import React, { useGlobal, useEffect, useState } from "reactn";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Button } from "react-bootstrap";

const Dashboard = props => {
  const [value, setValue] = useGlobal();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLoc = window.navigator.geolocation.getCurrentPosition(pos => {
      const { longitude, latitude } = pos.coords;

      setLocation({ longitude: Number(longitude), latitude: Number(latitude) });
    });
  }, [setLocation]);

  const onCurrentLocation = e => {
    const getLoc = window.navigator.geolocation.getCurrentPosition(pos => {
      const { longitude, latitude } = pos.coords;

      setValue(v => ({
        user: {
          ...v.user,
          location: {
            longitude,
            latitude
          }
        }
      }));
      console.log(location);
    });
  };

  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiYWhtYWR6YWtpZG96IiwiYSI6ImNrNXM5bmExODA3eHMzZG8xcTFudWJmNW0ifQ.twKKmTRqukPEK5rOIpHjBA"
  });

  if (location) {
    return (
      <>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[location.longitude, location.latitude]}
          zoom={[14]}
        >
          <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[location.longitude, location.latitude]} />
          </Layer>
          <Button className="position-absolute" onClick={onCurrentLocation}>
            Get Current Location
          </Button>
        </Map>
      </>
    );
  } else {
    return <>loading...</>;
  }
};

export default Dashboard;
