import { useEffect, useState } from "preact/hooks";
import { PerspectiveProxy } from "@perspect3vism/ad4m";
import { useEntries, useEntry } from "@fluxapp/react-web";
import { AgentClient } from "@perspect3vism/ad4m/lib/src/agent/AgentClient";

import styles from "../App.module.css";
import Job from "../models/Job";

type Props = {
  perspective: PerspectiveProxy;
  source: string;
  id: string;
};

export default function IndividualJobView({ perspective, id, source }: Props) {
  
  // const { entries: jobs, model } = useEntries({
  //   perspective,
  //   source,
  //   model: Job,
  // });

  
  const { entry: job, model } = useEntry({
    perspective,
    source,
    id: id,
    model: Job,
  });

  const handleDeleteJob = (id: string) => {
    console.log(job)
    console.log(id)
    console.log("deleting")
    model.remove(id).catch(console.log);
  };

  // function deleteTodo(id: string) { 
  //   model.remove(id); 
  // } 

  if (!id) {
    return null; // Return early if id is not present
  }

  const renderJob = () => {
    if (job) {
      return (
        <div>
          <j-box bg="ui-200" p="500" radius="md">
            <div>Individual Job View Component</div>
            <j-text variant="heading-lg" >{job.jobTitle}</j-text>
            <j-text variant="label"><strong>ID: </strong>{id}</j-text>
            <j-flex j="end" a="center" wrap gap="500" direction="row">
              {/* <j-box p="500" bg="ui-300">Item 1</j-box> */}
              {/* <j-box p="500" bg="ui-300">Item 2</j-box> */}
              <j-box p="500" bg="ui-300"><strong>Status:</strong>In_progress</j-box>
            </j-flex>
            <br></br>
            <j-text variant="label">Description</j-text>
            <j-box bg="ui-400" p="500" radius="md">
              <j-text variant="body">{job.jobDescription}</j-text>
            </j-box>

            <j-flex j="end" gap="500">

              <j-box mt="400">

                <j-button size="lg" onclick={() => handleDeleteJob(id)}>Delete</j-button>

              </j-box>



            </j-flex>

          </j-box>

        </div>
      );
    }
    // Add other cases here if needed
    return null; // Return null if job is not available
  };

  return (
    <div>
      {renderJob()}
    </div>
  );
}
