import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ApiTable.css';

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://apis.fretron.com/shipment-view/issues/issues?size=3000&filters={%22issueType.keyword%22%3A[%22Gaadi%20Malik%20Issue%22]}', {
      headers: {
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w'
      }
    })
    .then(response => {
      setData(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  function issuess(g) {
    var bda = "";
    for (var i = 0; i < g.length; i++) {
      if (g[i].fieldKey === 'Resolved By') {
        var name = g[i].value;
        if (name) {
          var firstLetter = name.charAt(0);
          var lastLetter = name.charAt(name.length - 1);
          bda = firstLetter + lastLetter;
        }
      }
    }
    return bda;
  }



  
  function prob(a){
var abc=""
for(var i=0;i<a.length;i++){
  if(a[i].fieldKey==='Problem Is'){
abc=a[i].value
  }

}
return abc
  }
  function removeLastFourDigitsFromVehicleNumber(a) {
    var vehicle = "";
    for (var i = 0; i < a.length; i++) {
      if (a[i].fieldKey === 'Vehicle Number') {
        vehicle = a[i].value;
      }
    }
  
    // Remove the last four digits from the vehicle number
    var trimmedVehicle = vehicle.slice(-4 );
    return trimmedVehicle;
  }

  
  


  function issue(a){
    var issudes=""
    for(var i=0;i<a.length;i++){
      if(a[i].issueDescription !== 'Gadi Malik'){
    issudes=a[i].issueDescription
      }
    
    }
    return issudes
      }

      return (
        <table>
          <thead>
            <tr className='black'>
              <th className="red-line">V NO.</th>
              <th className="red-line">GM</th>
              <th className="red-line">PROBLEM</th>
              <th className="red-line">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.fieldKey}>
                <td>{removeLastFourDigitsFromVehicleNumber(item.customFields)}</td>
                <td>{issuess(item.customFields)}</td>
                <td>{console.log(prob(item.customFields),"hi")}</td>
                <td className='yellow-text'>{item.issueDescription}</td>
                <td>{issue(item.customFields)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    
    export default Table;