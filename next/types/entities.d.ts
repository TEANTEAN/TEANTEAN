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
