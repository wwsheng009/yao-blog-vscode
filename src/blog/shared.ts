import { TreeItemLabel } from "vscode";
import { fileExt } from "../constants";

export interface PostFile {
  title: string;
  fsPath: string;
  ext: string;
}

export enum PostState {
  A = 0, //新建
  M = 1, //修改
  D = 2, //删除
  R = 3, //正常
}

export interface PostBaseInfo {
  id: number;
  postId?: any;
  title: string;
  remoteTitle?: string;
  state: PostState;
  fsPath: string;
  remotePath?: string;
  categories?: Array<string | TreeItemLabel>;
  link?: string;
  permalink?: string;
  ext?: string; //后缀
}

export interface PostIndexInfo {
  id: number;
  postid: any;
  title: string;
  ext: string; //后缀
  remoteTitle?: string;
  categories?: Array<string | TreeItemLabel>;
  link?: string;
  permalink?: string;
}

export function extractFilenameParts(title: string) {
  // Find the last occurrence of a dot (.)
  const dotIndex = title.lastIndexOf(".");

  let basePart, extension;

  if (dotIndex !== -1) {
    // Extract the base part and extension
    basePart = title.slice(0, dotIndex);
    extension = title.slice(dotIndex);
  } else {
    // Set the default extension to ".md"
    basePart = title;
    extension = fileExt;
  }

  // Return the extracted parts as an object
  return {
    basePart: basePart,
    extension: extension,
  };
}
