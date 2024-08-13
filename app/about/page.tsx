export default function About() {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Car Identifier</h1>
        <p className="text-lg text-gray-600 mb-4">
          Car Identifier is a cutting-edge web application that uses advanced AI technology
          to identify cars from uploaded images. Our system is powered by the Google Gemini API,
          providing accurate and detailed information about various car models.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Whether you are a car enthusiast, a potential buyer, or just curious about a car you have seen,
          our tool can help you quickly identify and learn more about different vehicles.
        </p>
        <p className="text-lg text-gray-600">
          Simply upload a clear image of a car, and our AI will analyze it to provide you with
          information about the make, model, and other relevant details.
        </p>
      </div>
    )
  }