import { useEffect, useState } from "preact/hooks";
import { PerspectiveProxy } from "@perspect3vism/ad4m";
import { useEntries } from "@fluxapp/react-web";
import { AgentClient } from "@perspect3vism/ad4m/lib/src/agent/AgentClient";



import styles from "../App.module.css";

import Job from "../models/Job";

type Props = {
  perspective: PerspectiveProxy;
  source: string;
  agent: AgentClient;
  setMenuState: (menu: string) => void; // Define the type for setMenuState prop
};






export default function CreateJobView({ agent, perspective, source, setMenuState }: Props) {
  const [jobTitleState, setJobTitleState] = useState("");
  const [jobDescriptionState, setJobDescriptionState] = useState("");
  const [jobState, setJobState] = useState("To_Do");

  const { entries: jobs, model } = useEntries({
    perspective,
    source,
    model: Job,
  });
  console.log("perspective.uuid on CreateJobView.tsx: " + perspective.uuid)


  useEffect(() => {
    console.log("Menu State: " + jobTitleState)
  }, [jobTitleState,jobDescriptionState]);

  const handleSaveJob = () => {
    console.log("handleSaveJob")
    console.log("jobState: " + jobState)
    // todo, create the model. 
    model
      .create({jobTitle: jobTitleState, jobDescription: jobDescriptionState, jobStatus: jobState})
      .then(() => {
        setJobTitleState("");
        setJobDescriptionState("");
        setMenuState("All_Jobs")
      })
      .catch(console.log)
  }     


  return (
    <div >
      

      <j-flex a="start" direction="column" gap="1000">

        <j-input
          helptext="Please give the job a short name."
          label="Job Name"
          value={jobTitleState}
          onChange={(e) => setJobTitleState(e.target.value)}
          style={{ width: '500px' }}
        ></j-input>
        <j-input
          helptext="Please describe how you want the job to be done and what the finished job shold look like."
          label="Job Description"
          value={jobDescriptionState}
          onChange={(e) => setJobDescriptionState(e.target.value)}
          style={{ width: '500px' }}
        ></j-input>
        <j-button onclick={() => handleSaveJob()} variant="primary">Save Job</j-button>





      </j-flex>




    </div>
  );
}