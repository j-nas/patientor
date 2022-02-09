import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

interface Id {
  id: string
}
export const PatientInfoPage = () => {
  const [patient, setPatient] = React.useState<Patient>();
  const { id } = useParams<Id>(); 


  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientInfo } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log(patientInfo);
        setPatient(patientInfo);
        
      } catch(e) {
        console.log(e);
      }
    };
    void fetchPatient();
  },[patient]);
  
  if (patient === undefined ) {
    return null;
  }
  
  if (patient) {
    return (
      <h3>
        {patient.name}
      </h3>
    );
  }
};

export default PatientInfoPage;