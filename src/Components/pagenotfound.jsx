
export default function Pagenotfound() {
  return (
    <div className="w-screen h-screen border-2 flex items-center justify-center p-4 relative ">
      
      <div className="absolute top-8 left-8 bg-white rounded p-2 ">
        <img
          src="/5641ceb76e39893bb5f7238e4da0f5b5.png"
          alt="Logo"
          className="w-[180px] md:w-[250px] h-auto object-contain"
        />
      </div>


      <div className="bg-white w-full h-full max-w-6xl rounded-lg p-16 flex flex-col items-center justify-center">
        
        <img src="/9156c5ca6c2dafd9d93a115e1ddf1b5a.jpg" alt="404 Illustration" className="w-[600px] mb-12" />

        <p className="text-gray-700 text-2xl mt-4 mb-8 text-center">
          Sorry, it looks like the page doesn't exist.
        </p>

        <a href="/" className="inline-block">
          <button className="bg-teal-700 hover:bg-teal-800 text-white px-12 py-4 text-xl rounded-lg transition duration-300">
            Back to Home
          </button>
        </a>
      </div>
    </div>
  );
}
