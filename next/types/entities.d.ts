interface Roundtable {
  id: string;
  zoomLink: string;
  description: string;
  capacity: number;
  dateTime: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
  participants: any[];
}

interface DriveFile {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
  url: string;
}

interface Role {
  _id: string;
  name: string;
  description: string;
  type: string;
  __v: int;
  id: string;
}

interface User {
  confirmed: boolean;
  blocked: boolean;
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  __v: int;
  role: Role;
  roundtableSeries: RoundtableSeries;
  id: string;
  organisation: Organisation;
}

interface Organisation {
  name: string;
  id: string;
  image: File;
}

interface RoundtableSeries {
  id: string;
  title: string;
  description: string;
  researchPartner: User;
  videoLink: string;
  organisation: Organisation;
  image: File;
  files: File[];
}

interface File {
  _id: string;
  name: string;
  hash: string;
  ext: string;
  mime: string;
  size: string;
  width: number;
  height: number;
  url: number;
  driveFileId: string;
  driveFileUrl: string;
  driveFileFolderUrl: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}
