import { SDNAClass, subjectProperty, subjectFlag } from "@perspect3vism/ad4m";

@SDNAClass({
  name: "Job",
})
export default class Job {
  @subjectFlag({
    through: "flux://entry_type",
    value: "flux://has_job",
  })
  type: string;

  @subjectProperty({
    through: "rdf://jobtitle",
    writable: true,
    resolveLanguage: "literal",
  })
  jobTitle: string;

  @subjectProperty({
    through: "rdf://jobdescription",
    writable: true,
    resolveLanguage: "literal",
  })
  jobDescription: string;

  @subjectProperty({
    through: "rdf://jobstatus",
    writable: true,
    resolveLanguage: "literal",
  })
  jobStatus: string;
}
