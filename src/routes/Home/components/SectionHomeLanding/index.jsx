/* eslint-disable global-require */
// import aboutUs from '../../assets/About Us.png';
function SectionHomeLanding() {
  return (
    <div>
      <div>
        <div className="text-center">
          <h1 className="w-50 mx-auto p-5">Your trusted veterinary clinic consultation booking platform</h1>
        </div>
        <div className="about-us">
          <img width="75%" height="100%" src={require('../../assets/About Us.png')} alt="" srcSet="" />
          <div className="mx-5 position-absolute top-50 end-0 translate-middle-y w-50">
            <h1>About Us</h1>
            <p className="lh-lg">Paw Inc. is an online veterinary clinic consultation booking platform that was established in May 2023 as part of a final assignment or thesis for Bina Nusatara University students. Paw Inc. connecting pet owners who need consultation with professional veterinarians to avoid the problem of ordering traditionally which is considered less effective and efficient.Through this platform it is hoped that problems such as; the difficulty of ordering a veterinary consultation, the long waiting queues for a veterinary consultation, and the difficulty of knowing the location of a veterinarian can be resolved quickly and easily.</p>
          </div>
        </div>
      </div>
      <div className="text-center my-4">
        <h1>Our Creative</h1>
        <div className="row">
          <div className="col">
            <img className="image-thumbnail" width="200" height="200" src="{{ asset('assets/images/profile.png') }}" alt="" srcSet="" />
            <h3>Tristania Angina Santoso</h3>
            <p>Register via the Paw Inc. website</p>
          </div>
          <div className="col">
            <img className="image-thumbnail" width="200" height="200" src="{{ asset('assets/images/profile.png') }}" alt="" srcSet="" />
            <h3>Nathaniel Reynard Koagouw</h3>
            <p>Register via the Paw Inc. website</p>
          </div>
          <div className="col">
            <img className="image-thumbnail" width="200" height="200" src="{{ asset('assets/images/profile.png') }}" alt="" srcSet="" />
            <h3>Theofani Fiona Hypatia</h3>
            <p>Register via the Paw Inc. website</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionHomeLanding;
