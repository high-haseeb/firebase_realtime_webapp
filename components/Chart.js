"use client";
import { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";

const Sensorvalues = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("/previous_data.json")
      .then((response) => response.json())
      .then((jsonData) => {
        let jD = jsonData.SensorData.ADXL1;
        setChartData(jD);
        setData(jsonData)
        setLoading(false)
        
      });
  }, []);
  const [dataA, setDataA] = useState([]);
  const [dataB, setDataB] = useState([]);

  useEffect(() => {
    chartData.map((value, index) => {
      if(value === null) return;
      let X = value.X; 
      if(index > 1 && index < 200) {
        let key = index;
        setDataA(data => [...data, X]);
      } else if(index > 200 && index < 400) {
        setDataB(data => [...data, X]);
      }
    })
  }, [chartData])

  if (loading) {
    return <p>Loading sensor data...</p>;
  }
  return (
    <div className="w-full flex lg:flex-row flex-col justify-around">
      {/* Chart Section */}
      <div className="lg:w-[60%] w-full relative">
        <div className="flex flex-col lg:w-[60%] w-[90%] lg:fixed">
          <div className="font-bold lg:text-4xl text-xl">Controls and Graphs</div>
          <div className="font-bold lg:text-2xl text-lg">{`Restart Value : ${chartData.restart}`}</div>
          <div>
            <ChartComponent data={dataA} data1={dataB} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sensorvalues;





// "use client";
// import { useEffect, useState } from "react";
// import { db, ref, onValue } from "../components/firebase";
// import ChartComponent from "./ChartComponent";

// const Sensorvalues = () => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const sensorRef = ref(db, "SensorData");

//     onValue(sensorRef, (snapshot) => {
//       const data = snapshot.val();
//       setData(data);

//       const transformedData = [];
//       let readingNo = 1;
//       Object.entries(data).forEach(([sensor, values]) => {
//         if (sensor !== "restart") {
//             if(readingNo>=200);
//             {
//                 readingNo=1;
//             }
//           Object.entries(values).forEach(([timestamp, readings]) => {
//             transformedData.push({
//               x: readingNo++, 
//               y: readings.X,
//             });
//           });
//         }
//       });

//       setChartData(transformedData);
//       setLoading(false);
//     });

//     // return () => {
//     //   sensorRef.off();
//     // };
//   }, []);

//   if (loading) {
//     return <p>Loading sensor data...</p>;
//   }

//   const Data = chartData.slice(5, 205);  // First line data
//   const Data1 = chartData.slice(206, 406).map(value => {return({...value, x :value.x - 200})});  // Second line data

//   return (
//     <div className="w-full flex lg:flex-row flex-col justify-around">
//       {/* Chart Section */}
//       <div className="lg:w-[60%] w-full relative">
//       <div className="flex flex-col lg:w-[60%] w-[90%] lg:fixed">
//         <div className="font-bold lg:text-4xl text-xl">Controls and Graphs</div>
//         <div className="font-bold lg:text-2xl text-lg">{`Restart Value : ${data.restart}`}</div>
//         <div>
//           <ChartComponent data={Data} data1={Data1} />
//         </div>
//       </div>
//       </div>

//       {/* Sensor Readings Section */}
      
//     </div>
//   );
// };

// export default Sensorvalues;




