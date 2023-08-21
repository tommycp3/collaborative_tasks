import { useState, useEffect } from "preact/hooks";
import { PerspectiveProxy } from "@perspect3vism/ad4m";
import { useEntries, useEntry } from "@fluxapp/react-web";
import { AgentClient } from "@perspect3vism/ad4m/lib/src/agent/AgentClient";

import Job from "../models/Job";

import IndividualJobView from "./IndividualJobView";


import styles from "../App.module.css";

type Props = {
  perspective: PerspectiveProxy;
  source: string;
  agent: AgentClient;
};


const jobStatus = [
  "To Do",
  "Pending Job(ID)",
  "In Progress",
  "Complete",
  "Invoiced",
  "Sent",
  "Paid",
];




export default function AllJobsView({ perspective, source }: Props) {
  const [open, setOpen] = useState(false); // for job status menu


  const [selectedJob, setSelectedJob] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedJobDescription, setSelectedJobDescription] = useState("");
  const [selectedJobStatus, setSelectedJobStatus] = useState("");

  const { entries: jobs, model } = useEntries({
    perspective,
    source,
    model: Job,
  });

  // console.log(jobs)




  const handleSelectJob = (ID, jobTitle, jobDescription) => {
    // if (menuState == "All_Jobs") { return <AllJobsView agent={agent} perspective={perspective} source={source} ></AllJobsView> }
    // if (menuState == "Create_Job") { return <CreateJobView agent={agent} perspective={perspective} source={source} setMenuState={setMenuState}></CreateJobView> }
    console.log("handleSelectJob:next work out how do ")
    setSelectedJob(ID)
    setSelectedJobTitle(jobTitle)
    setSelectedJobDescription(jobDescription)
    // setSelectedJobStatus(jobStatus)
    console.log(ID)


    console.log(selectedJob + " is the selected job")
    console.log(selectedJobTitle + " is the selected job title")
    console.log(selectedJobDescription + " is the selected job description")

  }






  return (
    <div>
      <div class="grid">
        <div>All Jobs Component</div>



        <table style="border-collapse: collapse; width: 100%; border: 1px solid white;">
          <tr style="border: 1px solid white;">
            <td style="border: 1px solid white; padding: 8px; text-align: center; font-weight: bold; text-color: black">Index</td>
            <td style="border: 1px solid white; padding: 8px; text-align: center; font-weight: bold;">Job Name</td>
            <td style="border: 1px solid white; padding: 8px; text-align: center; font-weight: bold;">Job Description</td>
            <td style="border: 1px solid white; padding: 8px; text-align: center; font-weight: bold;">Status</td>
          </tr>
          {jobs?.map((job, index) => (
            <tr style="border: 1px solid white;">
              <td style="border: 1px solid white; padding: 8px; text-align: left;"><j-button size="xs" onclick={() => handleSelectJob(job.id, job.jobTitle, job.jobDescription)}>View</j-button></td>
              <td style="border: 1px solid white; padding: 8px; text-align: left;">{job.jobTitle}</td>
              <td style="border: 1px solid white; padding: 8px; text-align: left;">{job.jobDescription}</td>
              <td style="border: 1px solid white; padding: 8px; text-align: left;">


                <j-flex gap="500" wrap>
                  <j-box p="100"  > {job.status}

                    <j-menu>
                      <j-menu-group
                        open={open}
                        onToggle={(e) => setOpen(e.currentTarget.open)}
                        collapsible
                        title="To Do" // when mapping it should take the status of the job and display the correct menu job.jobStatus
                      >
                        <j-menu-item>To Do</j-menu-item>
                        <j-menu-item>Pending Job(ID)</j-menu-item>
                        <j-menu-item>In Progress</j-menu-item>
                        <j-menu-item>Complete</j-menu-item>
                        <j-menu-item>Invoiced</j-menu-item>
                        <j-menu-item>Sent</j-menu-item>
                        <j-menu-item>Paid</j-menu-item>
                      </j-menu-group>
                    </j-menu>


                    {/* <j-text variant="label" >In_progress</j-text> */}




                  </j-box>

                </j-flex>








              </td>
            </tr>
          ))}
        </table>



      </div>
      <br></br>
      <br></br>

      <div class="grid">






        {/* <j-box p="500" bg="ui-400" m="300">
          <div >
            <j-text color="ui-800" weight="900" size="700">Selected Job</j-text>
            <j-text color="ui-800" weight="500" size="700">Job.Title {selectedJobTitle} </j-text>
            <j-text tag="h1">Job ID: {selectedJob} </j-text>
            <j-text tag="h1">Job Description: {selectedJobDescription} </j-text>
            <j-text tag="h1">Job Status: {selectedJobStatus} </j-text>
          </div>
        </j-box> */}

        {/* todo: Try to show the same view in it's own component */}

        <div>
          <IndividualJobView perspective={perspective} id={selectedJob} source={source}></IndividualJobView>

          {/* <CreateJobView agent={agent}  source={source} setMenuState={setMenuState}></CreateJobView>  */}

        </div>





      </div>
    </div>
  );
}