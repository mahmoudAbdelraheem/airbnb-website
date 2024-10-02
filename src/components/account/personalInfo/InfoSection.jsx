import eyeImage from "../../../assets/eye.png";
import scureImage from "../../../assets/scure.png";
import lockImage from "../../../assets/lock.png";

function InfoSection() {
  return (
    <div className="lg:col-span-4">
      <div className="p-12 bg-white border rounded-lg space-y-4">
        <div>
          <img
            src={scureImage}
            className="w-12 h-12 rounded-full mb-4"
            alt="Info"
          />
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-gray-800 font-semibold text-2xl">
              Why isn’t my info shown here?
            </div>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            We’re hiding some account details to protect your identity.
          </p>
          <hr />
        </div>
        <div>
          <img
            src={lockImage}
            className="w-12 h-12 rounded-full mb-4"
            alt="Info"
          />
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-gray-800 font-semibold text-2xl">
              Which details can be edited?
            </div>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Contact info and personal details can be edited. If this info was
            used to verify your identity, you’ll need to get verified again the
            next time you book—or to continue hosting.
          </p>
          <hr />
        </div>
        <div>
          <img
            src={eyeImage}
            className="w-12 h-12 rounded-full mb-4"
            alt="Info"
          />
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-gray-800 font-semibold text-2xl">
              What info is shared with others?
            </div>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Airbnb only releases contact information for Hosts and guests after
            a reservation is confirmed.
          </p>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
