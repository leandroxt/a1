type Tag = {
  name: string;
}

type Commitment = {
  title: string;
}

type Company = {
  name: string;
  slug: string;
}

type remotes = {
  name: string;
}

export type Job = {
  id: string;
  title: string;
  slug: string;
  applyUrl: string;
  description: string;
  locationNames: string;
  company: Company;
  commitment: Commitment;
  tags: Array<Tag>;
  remotes: remotes;
}
