import { useState, useEffect } from 'react';
import { Input } from '../../components/Input.jsx';
import { validateClient, validateResDate, validateInDate, validateOutDate, validateRoom } from '../../shared/validators/validator.js';
import './Reservation.css';
import { useReservation } from '../../shared/hooks/useReservation.jsx';
import { getDetailsUser } from '../../services/api.js';
import { Navbar } from '../../components/Navbar/Navbar.jsx';

export const Reservation = () => {
  const [initialProfileState, setInitialProfileState] = useState({});
  const [profile, setProfile] = useState({});
  const [clientValue, setClientValue] = useState('');
  const { reservation, isLoading } = useReservation();

  const [formData, setFormData] = useState({
    client: {
      value: '',
      isValid: false,
      showError: false,
    },
    resDate: {
      value: new Date().toISOString().split('T')[0],
      isValid: true,
      showError: false,
    },
    inDate: {
      value: '',
      isValid: false,
      showError: false,
    },
    outDate: {
      value: '',
      isValid: false,
      showError: false,
    },
    room: {
      value: '',
      isValid: false,
      showError: false,
    },
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userDetails = await getDetailsUser();
          if (userDetails) {
            setProfile(userDetails);
            setInitialProfileState(userDetails);
            if (userDetails.username) {
              setClientValue(userDetails.username);
              setFormData((prevData) => ({
                ...prevData,
                client: {
                  ...prevData.client,
                  value: userDetails.username,
                  isValid: true,
                },
              }));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const isSubmitButtonDisable =
    !formData.client.isValid ||
    !formData.resDate.isValid ||
    !formData.inDate.isValid ||
    !formData.outDate.isValid ||
    !formData.room.isValid;

  const handleReservation = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    setFormData((prevData) => ({
      ...prevData,
      resDate: {
        ...prevData.resDate,
        value: currentDate,
      },
    }));
    await reservation(
      formData.client.value,
      formData.resDate.value,
      formData.inDate.value,
      formData.outDate.value,
      formData.room.value
    );
  };

  const handleValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value,
      },
    }));
  };

  const handleValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'client':
        isValid = validateClient(value);
        break;
      case 'resDate':
        isValid = validateResDate(value);
        break;
      case 'inDate':
        isValid = validateInDate(value);
        break;
      case 'outDate':
        isValid = validateOutDate(value);
        break;
      case 'room':
        isValid = validateRoom(value);
        break;
      default:
        break;
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      

      <div>
        <div>
          <br />
          <h1 className="h1Reservations">Reservations</h1>
          <br />
          <form onSubmit={handleReservation}>
            <label>Cliente</label>
            <Input
              field="client"
              label="Cliente"
              value={clientValue}
              onChangeHandler={handleValueChange}
              type="text"
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.client.showError}
              disabled
            />
            <label>In date</label>
            <Input
              field="inDate"
              label="InDate"
              value={formData.inDate.value}
              onChangeHandler={handleValueChange}
              type="date"
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.inDate.showError}
            />
            <label>Out date</label>
            <Input
              field="outDate"
              label="OutDate"
              value={formData.outDate.value}
              onChangeHandler={handleValueChange}
              type="date"
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.outDate.showError}
            />
            <label>Room</label>
            <Input
              field="room"
              label="Room"
              value={formData.room.value}
              onChangeHandler={handleValueChange}
              type="text"
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.room.showError}
            />
            <button type="submit" >
              {isLoading ? 'Loading...' : 'Make a reservation'}
            </button>
          </form>
          
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Reservation;