import { useEffect, useState } from "preact/hooks";
import { PerspectiveProxy } from "@perspect3vism/ad4m";
import { useEntries } from "@fluxapp/react-web";
import { AgentClient } from "@perspect3vism/ad4m/lib/src/agent/AgentClient";

import AllJobsView from "./AllJobsView";
import CreateJobView from "./CreateJobView";

import styles from "../App.module.css";

type Props = {
  perspective: PerspectiveProxy;
  source: string;
  agent: AgentClient;
};

export default function Layout({ agent, perspective, source }: Props) {
  const [menuState, setMenuState] = useState("All_Jobs");

  const manageMenus = (menu: string) => {
    if (menu === "All_Jobs") {
      return <AllJobsView agent={agent} perspective={perspective} source={source} />;
    }
    if (menu === "Create_Job") {
      return <CreateJobView agent={agent} perspective={perspective} source={source} setMenuState={setMenuState} />;
    }
  };

  useEffect(() => {
    // console.log("Menu State: " + menuState)
  }, [menuState]);

  return (
    <div>
      <j-flex wrap gap="500">
        <j-box p="500" bg="ui-300">
          <j-menu>
            <j-menu-item selected={menuState === "All_Jobs"} onclick={() => setMenuState("All_Jobs")}>
              All Jobs
            </j-menu-item>
            <j-menu-item selected={menuState === "Create_Job"} onclick={() => setMenuState("Create_Job")}>
              Create Job
            </j-menu-item>
          </j-menu>
        </j-box>
        <j-box p="500" bg="ui-300">{manageMenus(menuState)}</j-box>
      </j-flex>
    </div>
  );
}
