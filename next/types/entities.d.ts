interface Roundtable {
  id: string;
  name: string;
  zoomLink: string;
  description: string;
  capacity: number;
  dateTime: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
  participants: Participant[];

  files: File[];
  meetingFolderName: string;
  meetingFolderId: string;
  recordingLink: string;
  researchPartnerFolderName: string;
  researchPartnerFolderId: string;
  published_at: Date;
  created_at: Date;
  status: string;
  start_time: Date;
  end_time: Date;
  event_memberships: { user: string }[];
  invitees_counter: {
    active: number;
    limit: number;
    total: number;
  };
  location: {
    join_url: string;
    status: string;
    type: string;
  };
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
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  id: string;
  organisation: { name: string, id: string, image: File }
}

interface Organisation {
  name: string;
  id: string;
  image: File;
  users: User[];
}

interface OrganisationOmitUsers {
  name: string;
  id: string;
  image: File;
}

interface RoundtableSeries extends CalendlySeries {
  id: string;
  videoLink: string;
  organisation: Organisation;
  image: File;
  files: File[];
  seriesFolderName: string;
  seriesFolderId: string;
  researchPartnerFolderName: string;
  researchPartnerFolderId: string;
  roundtablesFolderName: string;
  roundtablesFolderId: string;
  published_at: string;
  createdAt: string;
  updatedAt: string;
  roundtables: Roundtable[];
}

interface File {
  id: string;
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
}

interface Participant {
  id: string;
  participantURI: string;
  participantFolderId: string;
  participantFolderName: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
  cancel_url: string;
  email: string;
  name: string;
  questions_and_answers: { question: string; answer: string }[];
  reschedule_url: string;
  rescheduled: string;
  status: string;
  text_reminder_number: string;
  timezone: string;
  certificateSent: boolean;
  paid: boolean;
  receiptSent: boolean;
}

interface CalendlySeries {
  uri: string;
  name: string;
  active: boolean;
  slug: string;
  scheduling_url: string;
  duration: number;
  kind: string;
  pooling_type?: string;
  type: string;
  color: string;
  created_at: Date;
  updated_at: Date;
  internal_note: string;
  description_plain: string;
  description_html: string;
  profile: {
    type: string;
    name: string;
    owner: string;
  };
  secret: boolean;
}
