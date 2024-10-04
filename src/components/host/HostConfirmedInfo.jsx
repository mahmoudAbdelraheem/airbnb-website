/* eslint-disable react/prop-types */
function HostConfirmedInfo({ host }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        {host.name}&apos;s confirmed information
      </h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Identity</span>
        </li>
        <li className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Email address</span>
        </li>
        <li className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Phone number</span>
        </li>
      </ul>
      <a href="#" className="text-blue-500 hover:underline text-sm mt-4 block">
        Learn about identity verification
      </a>
    </div>
  );
}

export default HostConfirmedInfo;
