import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";

interface Id {
  id: string
}
export const PatientInfoPage = (): JSX.Element | null => {
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
  },[]);
  
  if (patient === undefined ) {
    return null;
  }
  
  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}
          
          {patient.gender === "male" 
            ? <Icon name="mars"></Icon> 
            : patient.gender === "female"
            ? <Icon name="venus"></Icon>
            : <Icon name="genderless"></Icon>
          }
        </h2>
        <p><b>
          ssn: {patient.ssn} <br />
          occupation: {patient.occupation}
          </b></p>
      </div>
    );
  }
  return null;
};

export default PatientInfoPage;