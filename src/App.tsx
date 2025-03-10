import { useState, useRef, useCallback, useMemo } from "react";

// Car class to define car properties
class Car {
  constructor(public id: number, public brand: string, public model: string, public year: number) {}
}

const App = () => {
  console.log("App renders");
  const [cars, setCars] = useState<Car[]>([]);
  const brandRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Add Car function
  const addCar = useCallback(() => {
    console.log("addCar runs");
    const brand = brandRef.current?.value;
    const model = modelRef.current?.value;
    const year = Number(yearRef.current?.value);
    if (brand && model && year) {
      const newCar = new Car(Date.now(), brand, model, year);
      setCars((prevCars) => [...prevCars, newCar]);
      console.log("Car added:", newCar);
      if (brandRef.current) brandRef.current.value = "";
      if (modelRef.current) modelRef.current.value = "";
      if (yearRef.current) yearRef.current.value = "";
    }
  }, []);

  // Delete Car function
  const deleteCar = useCallback((id: number) => {
    console.log("deleteCar runs");
    setCars((prevCars) => prevCars.filter(car => car.id !== id));
    console.log("Car deleted with id:", id);
  }, []);

  // Memoized Car List
  const carList = useMemo(() => {
    console.log("useMemo runs");
    return cars.map((car) => (
      <div key={car.id} className="flex justify-between items-center p-2 border rounded-lg shadow-md my-2">
        <span>{car.brand} {car.model} ({car.year})</span>
        <button onClick={() => deleteCar(car.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    ));
  }, [cars]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold text-center">Car List</h1>
      <div className="flex flex-col gap-2 my-4">
        <input ref={brandRef} type="text" placeholder="Brand" className="p-2 border rounded" />
        <input ref={modelRef} type="text" placeholder="Model" className="p-2 border rounded" />
        <input ref={yearRef} type="number" placeholder="Year" className="p-2 border rounded" />
        <button onClick={addCar} className="bg-blue-500 text-white p-2 rounded">Add Car</button>
      </div>
      <div>{carList}</div>
    </div>
  );
};

export default App;
