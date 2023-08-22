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

  const [showJob, setShowJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  const { entries: jobs, model } = useEntries({
    perspective,
    source,
    model: Job,
  });

  useEffect(() => {
    setShowJob(false);
  }, [jobs.length]);

  // console.log(jobs)

  const handleSelectJob = (ID, jobTitle, jobDescription) => {
    setSelectedJob(ID);
    setShowJob(true);
  };

  return (
    <div>
      <div class="grid">
        <table style="border-collapse: collapse; width: 100%; border: 1px solid white;">
          <tr style="border: 1px solid white;">
            <td style="border: 1px solid white; padding: 8px; text-align: center; font-weight: bold; text-color: black">
              Index
            </td>
            <td style="border: 1px solid white; padding: 8px; text-align: center; font-weight: bold;">
              Job Name
            </td>
            <td style="border: 1px solid white; padding: 8px; text-align: center; font-weight: bold;">
              Job Description
            </td>
            <td style="border: 1px solid white; padding: 8px; text-align: center; font-weight: bold;">
              Status
            </td>
          </tr>
          {jobs?.map((job, index) => (
            <tr style="border: 1px solid white;">
              <td style="border: 1px solid white; padding: 8px; text-align: left;">
                <j-button
                  size="xs"
                  onclick={() =>
                    handleSelectJob(job.id, job.jobTitle, job.jobDescription)
                  }
                >
                  View
                </j-button>
              </td>
              <td style="border: 1px solid white; padding: 8px; text-align: left;">
                {job.jobTitle}
              </td>
              <td style="border: 1px solid white; padding: 8px; text-align: left;">
                {job.jobDescription}
              </td>
              <td style="border: 1px solid white; padding: 8px; text-align: left;">
                <j-flex gap="500" wrap>
                  <j-box p="100">
                    <select
                      onChange={(e) =>
                        model.update(job.id, { jobStatus: e.target.value })
                      }
                      value={job.jobStatus}
                    >
                      <option selected disabled>
                        Select a status
                      </option>
                      {jobStatus.map((o) => (
                        <option selected={o === job.jobStatus} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
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
          <j-modal open={showJob} onToggle={(e) => setShowJob(e.target.open)}>
            <IndividualJobView
              perspective={perspective}
              id={selectedJob}
              source={source}
            ></IndividualJobView>
          </j-modal>

          {/* <CreateJobView agent={agent}  source={source} setMenuState={setMenuState}></CreateJobView>  */}
        </div>
      </div>
    </div>
  );
}
