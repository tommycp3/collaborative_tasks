import styles from "./App.module.css";
import { PerspectiveProxy } from "@perspect3vism/ad4m"; // imports type definitions for PerspectiveProxy from @perspect3vism/ad4m
import TodoView from "./components/TodoView";
import "@fluxapp/ui/dist/main.d.ts";
import { AgentClient } from "@perspect3vism/ad4m/lib/src/agent/AgentClient";
import Layout from "./components/Layout";

type Props = {
  agent: AgentClient;
  perspective: PerspectiveProxy;
  source: string;
};

export default function App({ agent, perspective, source }: Props) {
  if (!perspective?.uuid || !agent) return "No perspective or agent client";
  console.log("perspective.uuid on App.tsx:", perspective.uuid);
  // console.log("source", source);

  return (
    <div className={styles.appContainer}>
      {/* <TodoView perspective={perspective} source={source} agent={agent}></TodoView> */}
      <Layout perspective={perspective} source={source} agent={agent} />
      {/* <h1> This is cool</h1> */}
      {/* <IndividualTaskViewBox perspective={perspective} source={source}></IndividualTaskViewBox> */}

    
    </div>
  );
}
