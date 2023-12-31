import { SDNAClass, subjectProperty, subjectFlag } from "@perspect3vism/ad4m";

@SDNAClass({
  name: "Todo",
})
export default class Todo {
  @subjectFlag({
    through: "flux://entry_type",
    value: "flux://has_todo",
  })
  type: string;

  @subjectProperty({
    through: "rdf://title",
    writable: true,
    resolveLanguage: "literal",
  })
  title: string;

  @subjectProperty({
    through: "rdf://description",
    writable: true,
    resolveLanguage: "literal",
  })
  desc: string;

  @subjectProperty({
    through: "rdf://status",
    writable: true,
    resolveLanguage: "literal",
  })
  done: boolean;

  @subjectProperty({
    through: "rdf://project_tag",
    writable: true,
    resolveLanguage: "literal",
  })
  project_tag: string; // An array of strings representing tags which can be quieried.

  @subjectProperty({
    through: "rdf://person_tag",
    writable: true,
    resolveLanguage: "literal",
  })
  person_tag: string; // An array of strings representing tags which can be quieried.
}
