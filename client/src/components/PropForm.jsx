import { useState, useRef } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddPropertyForm() {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState({
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearbyHospitals: '',
    nearbyColleges: '',
  });
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combine property data and images for form submission
    const formData = new FormData();
    formData.append('area', propertyData.area);
    formData.append('bedrooms', propertyData.bedrooms);
    formData.append('bathrooms', propertyData.bathrooms);
    formData.append('nearbyHospitals', propertyData.nearbyHospitals);
    formData.append('nearbyColleges', propertyData.nearbyColleges);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    //submit form using /api/properties post
    const res = await axios.post('http://localhost:3000/api/properties', formData);
    console.log(res);
    if (res.status === 201) {
      alert('Property added successfully');
      navigate('/');
    } else {
      alert('Error adding property');
    }
  };

  return (
    <Card color="transparent" shadow={false} className="bg-white p-5">
      <Typography variant="h4" color="blue-gray">
        Add Property
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter property details to add a new property.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Area
          </Typography>
          <Input
            size="lg"
            placeholder="Area"
            value={propertyData.area}
            onChange={handleChange}
            name="area"
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Bedrooms
          </Typography>
          <Input
            size="lg"
            placeholder="Bedrooms"
            value={propertyData.bedrooms}
            onChange={handleChange}
            name="bedrooms"
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Bathrooms
          </Typography>
          <Input
            size="lg"
            placeholder="Bathrooms"
            value={propertyData.bathrooms}
            onChange={handleChange}
            name="bathrooms"
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nearby Hospitals
          </Typography>
          <Input
            size="lg"
            placeholder="Nearby Hospitals"
            value={propertyData.nearbyHospitals}
            onChange={handleChange}
            name="nearbyHospitals"
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nearby Colleges
          </Typography>
          <Input
            size="lg"
            placeholder="Nearby Colleges"
            value={propertyData.nearbyColleges}
            onChange={handleChange}
            name="nearbyColleges"
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Upload Property Images
          </Typography>
          <Button className="mt-6" fullWidth onClick={handleFileUpload}>
            Upload
          </Button>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {images.length > 0 && (
            <div className="mt-3">
              <Typography color="blue-gray">Selected Images:</Typography>
              <ul>
                {images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}

          <Button className="mt-6" fullWidth type="submit">
            Add Property
          </Button>
        </div>
      </form>
    </Card>
  );
}
