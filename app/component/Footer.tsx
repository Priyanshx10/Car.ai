const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; {new Date().getFullYear()} Blessed Car. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-400">Powered by The Blessed Only</p>
        </div>
      </footer>
    )
  }
  
  export default Footer