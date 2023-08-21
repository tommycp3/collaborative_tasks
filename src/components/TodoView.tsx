import { useState } from "preact/hooks";
import { PerspectiveProxy } from "@perspect3vism/ad4m";
import { useEntries } from "@fluxapp/react-web";
import { AgentClient } from "@perspect3vism/ad4m/lib/src/agent/AgentClient";

import Layout from "./Layout";

import Todo from "../models/Todo";

import styles from "../App.module.css";

type Props = {
  perspective: PerspectiveProxy;
  source: string;
  agent: AgentClient;
};


const RegisteredProjectTags = [
  "transitional_legal",
  "phd",
  "Project Tag 3",
  "Project Tag 4",
  "Project Tag 5",
  "Project Tag 6",
  "Project Tag 7",
  "Project Tag 8",
  "Project Tag 9",
  "Project Tag 10",
];

export default function TodoView({ agent, perspective, source }: Props) {
  // console.log("ABOUT TO PRINT THE PERSPECTIVE")
  // console.log(perspective)
  // console.log("ABOUT TO PRINT THE SOURCE")
  // console.log(source)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project_tag, setProjectTag] = useState("");
  const [person_tag, setPersonTag] = useState("");

  const { entries: todos, model } = useEntries({
    perspective,
    source,
    model: Todo,
  });
  // console.log(todos)

  const [showDescription, setShowDescription] = useState(todos.map(() => false)); // New state for toggle

  function createTodo() {
    model
      .create({ title: title, desc: description, project_tag: project_tag, done: false })
      .then(() => {
        setTitle("");
        setDescription("");
        setProjectTag("");
        setPersonTag("");
      })
      .catch(console.log);
  }

  function toggleTodo({ id, done }) {
    model.update(id, { done }).catch(console.log);
  }

  function deleteTodo(id: string) {
    console.log(id)
    model.remove(id).catch(console.log);
  }

  function toggleDescription(index: number) { // New function to toggle description
    const newShowDescription = [...showDescription];
    newShowDescription[index] = !newShowDescription[index];
    setShowDescription(newShowDescription);
  }

  return (
    <div>

      <Layout perspective={perspective} source={source} agent={agent} />




















      <div className={styles.appContainer1}>
        <j-box pt="100" pb="500">
          <j-text size="800" weight="800" color="primary-500" variant="success">
            What are the tasks you need to get done to achieve your goals?
          </j-text>
        </j-box>

        <div className={styles.whiteBorderBox}>
          <j-box bg="ui-100" p="400" radius="md">
            <input
              autoFocus
              className={styles.titleInput}
              placeholder="Describe task here."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>

            <input
              className={styles.descriptionInput}
              placeholder="Write a description here or write it later on."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>



            <j-input
              // className={styles.tagInput}
              pattern="[hydroverse]+[lawfirm]+[phd]+[flux]+"
              autovalidate
              errortext="Your current projects are, hydroverse, lawfirm, phd, and flux."
              placeholder="Project Tag (optional)"
              value={project_tag}
              onChange={(e) => setProjectTag(e.target.value)}
            ></j-input>

            {/* <j-input
              pattern="[hydroverse]+[lawfirm]+[phd]+[flux]+" // This is a regex pattern that will only allow the words hydroverse, lawfirm, phd, and flux.
              autovalidate
              errortext="Your current projects are, hydroverse, lawfirm, phd, and flux."
              placeholder="Project Tag (optional)"
              value={project_tag}
              onChange={(e) => setTag(e.target.value)}
            ></j-input> */}

            <div className={styles.saveButtonContainer}>
              <j-button onClick={createTodo}>Save</j-button>
            </div>
          </j-box>
        </div>

        <j-box pt="500">
          <j-flex gap="300" direction="column">
            {todos.map((todo, index) => (
              <j-box bg="ui-50" p="400" radius="md">







                <j-flex j="between">
                  <div className={todo.done ? styles.doneTodo : ""}>
                    <j-checkbox
                      onChange={(e) => toggleTodo({ id: todo.id, done: e.target.checked })}
                      checked={todo.done}
                      style="--j-border-radius: 50%;"
                      size="sm"
                    >
                      {/* <j-icon slot="checkmark" size="xs" name="check"></j-icon> */}
                      <j-text size="500" nomargin className={styles.boldTitle}>
                        <strong>{todo.title}</strong>
                      </j-text>
                      <j-icon
                        onClick={() => toggleDescription(index)}
                        name={showDescription[index] ? "arrow-up" : "arrow-down"} // Change the icon name to fit your design
                      ></j-icon>
                      {showDescription[index] && (
                        <j-text size="500" nomargin>
                          {todo.desc}
                        </j-text>
                      )}
                    </j-checkbox>
                  </div>
                  <j-button onClick={() => deleteTodo(todo.id)}>Delete</j-button>
                </j-flex>




              </j-box>
            ))}
          </j-flex>
        </j-box>
      </div>


    </div>
  );
}