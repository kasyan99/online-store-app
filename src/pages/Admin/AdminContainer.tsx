import React from 'react';
import DeviceForm from "../../components/adminModal/DeviceForm";
import Admin from "./Admin";

//container is needed for test
const AdminContainer: React.FC = () => {
   return (
      <Admin deviceForm={<DeviceForm />} />
   )
}

export default AdminContainer