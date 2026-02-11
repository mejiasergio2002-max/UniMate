export type Room = {
  id: string;
  hostUserId: string;
  hostName: string;
  topic: string;
  isPublic: boolean;
  tipsTotal: number;
  createdAt: number;
};
