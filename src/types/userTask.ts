export interface iUserTask {
  _id: string;
  userId: UserId;
  taskId: TaskId;
  userInputs: UserInputs | any;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserInputs {
  username: string;
  proof: string;
}

export interface TaskId {
  taskReward: TaskReward;
  _id: string;
  taskTitle: string;
  taskDescription: string;
  customFields: CustomField[];
  taskActiveStatus: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CustomField {
  fieldType: string;
  value: string;
  fill?: string;
  placeholder: string;
  labelPlacement?: string;
  label: string;
  formControlName: string;
  type: string;
  multiple?: boolean;
}

interface TaskReward {
  currency: string;
  amount: Amount;
}

interface Amount {
  '$numberDecimal': string;
}

interface UserId {
  _id: string;
  email: string;
}