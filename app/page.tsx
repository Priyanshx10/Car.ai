import CarIdentifier from "./component/CarIdentifier"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Blessed Car</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Upload an image of a car, and we will identify it for you using advanced AI technology.
      </p>
      <CarIdentifier />
    </div>
  )
}