export interface loginInterface {
  loginAccount: (jwt: string) => void;
}

export interface logoutInterface {
  logoutAccount: () => void;
}

export interface BlogPost {
  title: string;
  body: string;
  preview: string;
  date: string;
  updated: string;
  _id: string;
  tags: string[];
  views: number;
  comments: object[];
}

export interface ICommentProps {
  name: string;
  body: string;
  _id: string;
  date: string;
  email: string;
  postId: string;
}
