import React, { useState} from 'react';
import './Main.css';
import axios from 'axios';
function Main(){
    const [Place, setPlace] = useState('서울지방병무청역');
    const[location,setLocation]=useState('');
    const[isOpen,setIsOpen]=useState('');
    const[brightness,setBrightness]=useState('');
    const[checkDate,setCheckDate]=useState('');
    const[temp,setTemp]=useState('');
    const[humidity,setHumidity]=useState('');
    const[show,setShow]=useState(false);
    const checkState = () => {

        axios.get('http://3.38.231.37:3002/posts')
        .then(response => {
          initMap();
          setLocation(response.data[0].location);
          setIsOpen(response.data[0].isOpen);
          setBrightness(response.data[0].brightness);
          setCheckDate(response.data[0].checkDate);
          setTemp(response.data[0].temp);
          setHumidity(response.data[0].humidity);
          setShow(true);
          
        })
        .catch(error => {
          
          console.error('에러 발생:', error);
        });
        
      };

      let map;
      let service;
      let infowindow;
      
    
      
      function initMap() {
        const mju = new window.google.maps.LatLng(37.224650469991, 127.18758354347);
      
        infowindow = new window.google.maps.InfoWindow();
        map = new window.google.maps.Map(document.getElementById("map"), {
          center: mju,
          zoom: 17,
        });
      
        var request = {
          query: Place,
          fields: ["name", "geometry","place_id"],
        };
        
        service = new window.google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
            
            map.setCenter(results[0].geometry.location);
          }
          
    
          request = {
            placeId: results[0].place_id,
            fields: ['name','formatted_address', 'rating', 'formatted_phone_number', 'geometry','opening_hours','reviews']
          
          };
          
          service = new window.google.maps.places.PlacesService(map);
          service.getDetails(request, callback);
          
          function callback(place, status) {
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {
              createMarker(place);  //지도에 마커찍음   
            }
          }
        });
    
    
    
         
      }
      
      function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;
      
        const marker = new window.google.maps.Marker({
          map,
          position: place.geometry.location,
        });
      
        window.google.maps.event.addListener(marker, "click", () => {
          infowindow.setContent(place.name || "");
          infowindow.open(map);
        });
    
      }
      
      
      window.initMap = initMap;
      
    
      
      
    return(
        <div className='Main'>
            <div className="title">
                <h1>온도 습도 밝기 문열림 확인</h1>
            </div>
            <div className='subtitle'>
                <h3>현재 상태를 확인하세요!</h3>
            </div>
            <br></br>

            {show&&
            <div className='subtitle'>
                <h3>위치: {location}</h3>
            </div>
            }
            {show&&
            <div className='subtitle'>
                <h3>{checkDate}</h3>
            </div>
            }
            {show&&
            <div className='subtitle'>
                <h3>온도: {temp}</h3>
            </div>
            }
            {show&&
            <div className='subtitle'>
                <h3>습도: {humidity} %</h3>
            </div>
            }
            {show&&
            <div className='subtitle'>
                <h3>조도: {brightness>3000?<div>LIGHT OFF</div>:<div>LIGHT ON</div>}</h3>
            </div>
            }
            {show&&
            <div className='subtitle'>
                <h3>문열림: {isOpen?<div>OPEN</div>:<div>CLOSE</div>}</h3>
            </div>
            
            } 
            {initMap&&
            <div id="map"
                className="map"
                style={{borderRadius:"20px",marginLeft:"25%", height: "40vh", width: `50%` }}
                ></div>
            }
            
            
             <br></br>
             <button className="bottomButton"onClick={checkState}>눌러서 확인하기</button>
        </div>

    );
}
export default Main;