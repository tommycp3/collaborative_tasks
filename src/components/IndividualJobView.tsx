import { useEffect, useState } from "preact/hooks";
import { PerspectiveProxy } from "@perspect3vism/ad4m";
import { useEntries, useEntry } from "@fluxapp/react-web";
import { AgentClient } from "@perspect3vism/ad4m/lib/src/agent/AgentClient";
import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import styles from "../App.module.css";
import Job from "../models/Job";

type Props = {
  agent: AgentClient;
  perspective: PerspectiveProxy;
  source: string;
  id: string;
};

export default function IndividualJobView({
  perspective,
  id,
  source,
  agent,
}: Props) {
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
    // console.log(job)
    // console.log(id)
    // console.log("deleting")
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
      console.log(job);
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const currentTimestamp = new Date();
      const localJobTimestamp = utcToZonedTime(
        new Date(job.timestamp),
        userTimeZone
      );
      const formattedTimestamp = format(
        new Date(localJobTimestamp),
        "eeee do MMM yyyy @ p",
        { timeZone: "Australia/Brisbane" }
      );

      const minutesDifference = differenceInMinutes(
        currentTimestamp,
        localJobTimestamp
      );
      const hoursDifference = differenceInHours(
        currentTimestamp,
        localJobTimestamp
      );
      const daysDifference = differenceInDays(
        currentTimestamp,
        localJobTimestamp
      );

      let timeAgoString = "";
      if (daysDifference > 0) {
        timeAgoString = `${daysDifference} day${
          daysDifference === 1 ? "" : "s"
        } ago`;
      } else if (hoursDifference > 0) {
        timeAgoString = `${hoursDifference} hour${
          hoursDifference === 1 ? "" : "s"
        } ago`;
      } else if (minutesDifference > 0) {
        timeAgoString = `${minutesDifference} minute${
          minutesDifference === 1 ? "" : "s"
        } ago`;
      } else {
        timeAgoString = "Just now";
      }

      return (
        <div>
          <j-box bg="ui-200" p="500" radius="md">
            <div>Individual Job View Component</div>
            <j-text variant="heading-lg">{job.jobTitle}</j-text>
            <j-text variant="label">
              <strong>Job ID: </strong>
              {id}
            </j-text>
            <j-text variant="label">
              <strong>Date created: </strong>
              {formattedTimestamp} ({timeAgoString}).
            </j-text>
            <j-flex j="end" a="center" wrap gap="500" direction="row">
              {/* <j-box p="500" bg="ui-300">Item 1</j-box> */}
              {/* <j-box p="500" bg="ui-300">Item 2</j-box> */}
              <j-box p="500" bg="ui-300">
                <strong>Status: </strong>
                {job.jobStatus}
              </j-box>
            </j-flex>
            <br></br>
            <j-text variant="label">Description</j-text>
            <j-box bg="ui-400" p="500" radius="md">
              <j-text variant="body">{job.jobDescription}</j-text>
            </j-box>

            <j-flex j="end" gap="500">
              <j-box mt="400">
                <j-button size="lg" onclick={() => handleDeleteJob(id)}>
                  Delete
                </j-button>
              </j-box>
            </j-flex>
            <comment-section
              perspective={perspective}
              source={id}
              agent={agent}
            ></comment-section>
          </j-box>
        </div>
      );
    }
    // Add other cases here if needed
    return null; // Return null if job is not available
  };

  return <div>{renderJob()}</div>;
}
