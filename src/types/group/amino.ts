import { AminoMsg } from "@cosmjs/amino";
import { AminoConverters } from "@cosmjs/stargate";
import {
  MsgCreateGroup,
  MsgUpdateGroupAdmin,
  MsgUpdateGroupMembers,
  MsgUpdateGroupMetadata,
  MsgUpdateGroupPolicyMetadata,
} from "./../../proto/ts/cosmos/group/v1/tx";
import {
  DecisionPolicyWindows,
  MemberRequest,
} from "./../../proto/ts/cosmos/group/v1/types";

export interface AminoCreateGroup extends AminoMsg {
  readonly type: "cosmos-sdk/MsgCreateGroups";
  readonly value: {
    readonly admin: string;
    readonly members: MemberRequest[];
    readonly metadata: string;
  };
}

export interface AminoUpdateGroupMembers extends AminoMsg {
  readonly type: "cosmos-sdk/MsgUpdateGroupMembers";
  readonly value: {
    readonly admin: string;
    readonly groupId: number;
    readonly memberUpdates: MemberRequest[];
  };
}

export interface AminoUpdateGroupAdmin extends AminoMsg {
  readonly type: "cosmos-sdk/MsgUpdateGroupAdmin";
  readonly value: {
    readonly admin: string;
    readonly groupId: number;
    readonly newAdmin: string;
  };
}

export interface AminoUpdateGroupMetadata extends AminoMsg {
  readonly type: "cosmos-sdk/MsgUpdateGroupMetadata";
  readonly value: {
    readonly admin: string;
    readonly groupId: number;
    metadata: string;
  };
}

export interface AminoUpdateGroupPolicyAdmin extends AminoMsg {
  readonly type: "cosmos-sdk/MsgUpdateGroupPolicyAdmin";
  readonly value: {
    readonly admin: string;
    readonly groupPolicyAddress: string;
    readonly newAdmin: string;
  };
}

export interface AminoUpdateGroupPolicyMetadata extends AminoMsg {
  readonly type: "cosmos-sdk/MsgUpdateGroupPolicyMetadata";
  readonly value: {
    readonly admin: string;
    readonly groupPolicyAddress: string;
    readonly metadata: string;
  };
}

export function isAminoMsgUpdateGroupPolicyMetadata(
  msg: AminoMsg
): msg is AminoUpdateGroupPolicyMetadata {
  return msg.type === "cosmos-sdk/MsgUpdateGroupPolicyMetadata";
}

export function isAminoMsgUpdateGroupMembers(
  msg: AminoMsg
): msg is AminoUpdateGroupMembers {
  return msg.type === "cosmos-sdk/MsgUpdateGroupMembers";
}

export function isAminoMsgCreateGroup(
  msg: AminoMsg
): msg is AminoUpdateGroupMembers {
  return msg.type === "cosmos-sdk/MsgCreateGroup";
}

export function isAminoMsgUpdateGroupAdmin(
  msg: AminoMsg
): msg is AminoUpdateGroupMembers {
  return msg.type === "cosmos-sdk/MsgUpdateGroupAdmin";
}

export function isAminoMsgUpdateGroupMetadata(
  msg: AminoMsg
): msg is AminoUpdateGroupMetadata {
  return msg.type === "cosmos-sdk/MsgUpdateGroupMetadata";
}

export interface AminoThresholdDecisionPolicy extends AminoMsg {
  readonly type: "cosmos-sdk/ThresholdDecisionPolicy";
  readonly value: {
    readonly threshold: string;
    readonly windows: DecisionPolicyWindows | undefined;
  };
}

export interface AminoPercentageDecisionPolicy extends AminoMsg {
  readonly type: "cosmos-sdk/PercentageDecisionPolicy";
  readonly value: {
    readonly percentage: string;
    readonly windows: DecisionPolicyWindows | undefined;
  };
}

export interface AminoCreateGroupWithPolicy extends AminoMsg {
  readonly type: "cosmos-sdk/MsgCreateGroupWithPolicy";
  readonly value: {
    readonly admin: string;
    readonly members: MemberRequest[];
    readonly groupMetadata: string;
    readonly groupPolicyMetadata: string;
    readonly groupPolicyAsAdmin: boolean;
    readonly decisionPolicy: {
      type: string;
      value: any;
    };
  };
}

export const groupAminoConverter = (): AminoConverters => {
  return {
    "/cosmos.group.v1.MsgUpdateGroupAdmin": {
      aminoType: "cosmos-sdk/MsgUpdateGroupAdmin",
      toAmino: ({
        admin,
        groupId,
        newAdmin,
      }: MsgUpdateGroupAdmin): AminoUpdateGroupAdmin["value"] => {
        return {
          admin: admin,
          groupId: groupId,
          newAdmin: newAdmin,
        };
      },
      fromAmino: ({
        admin,
        groupId,
        newAdmin,
      }: AminoUpdateGroupAdmin["value"]): MsgUpdateGroupAdmin => {
        return {
          admin: admin,
          groupId: groupId,
          newAdmin: newAdmin,
        };
      },
    },
    "/cosmos.group.v1.MsgUpdateGroupMembers": {
      aminoType: "cosmos-sdk/MsgUpdateGroupMembers",
      toAmino: ({
        admin,
        groupId,
        memberUpdates,
      }: MsgUpdateGroupMembers): AminoUpdateGroupMembers["value"] => {
        return {
          admin: admin,
          groupId: groupId,
          memberUpdates: memberUpdates,
        };
      },
      fromAmino: ({
        admin,
        groupId,
        memberUpdates,
      }: AminoUpdateGroupMembers["value"]): MsgUpdateGroupMembers => {
        return {
          admin: admin,
          groupId: groupId,
          memberUpdates: memberUpdates,
        };
      },
    },
    "/cosmos.group.v1.MsgCreateGroup": {
      aminoType: "cosmos-sdk/MsgCreateGroup",
      toAmino: ({
        admin,
        members,
        metadata,
      }: MsgCreateGroup): AminoCreateGroup["value"] => {
        return {
          admin: admin,
          members: [...members],
          metadata: metadata,
        };
      },
      fromAmino: ({
        admin,
        members,
        metadata,
      }: AminoCreateGroup["value"]): MsgCreateGroup => {
        return {
          admin: admin,
          members: [...members],
          metadata: metadata,
        };
      },
    },
    "/cosmos.group.v1.MsgUpdateGroupMetadata": {
      aminoType: "cosmos-sdk/MsgUpdateGroupMetadata",
      toAmino: ({
        admin,
        groupId,
        metadata,
      }: MsgUpdateGroupMetadata): AminoUpdateGroupMetadata["value"] => {
        return {
          admin: admin,
          groupId: groupId,
          metadata: metadata,
        };
      },
      fromAmino: ({
        admin,
        groupId,
        metadata,
      }: AminoUpdateGroupMetadata["value"]): MsgUpdateGroupMetadata => {
        return {
          admin: admin,
          groupId: groupId,
          metadata: metadata,
        };
      },
    },
    "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin": {
      aminoType: "cosmos-sdk/MsgUpdateGroupPolicyAdmin",
      toAmino: ({
        admin,
        groupId,
        metadata,
      }: MsgUpdateGroupMetadata): AminoUpdateGroupMetadata["value"] => {
        return {
          admin: admin,
          groupId: groupId,
          metadata: metadata,
        };
      },
      fromAmino: ({
        admin,
        groupId,
        metadata,
      }: AminoUpdateGroupMetadata["value"]): MsgUpdateGroupMetadata => {
        return {
          admin: admin,
          groupId: groupId,
          metadata: metadata,
        };
      },
    },

    "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata": {
      aminoType: "cosmos-sdk/MsgUpdateGroupPolicyMetadata",
      toAmino: ({
        admin,
        groupPolicyAddress,
        metadata,
      }: MsgUpdateGroupPolicyMetadata): AminoUpdateGroupPolicyMetadata["value"] => {
        return {
          admin: admin,
          groupPolicyAddress: groupPolicyAddress,
          metadata: metadata,
        };
      },
      fromAmino: ({
        admin,
        groupPolicyAddress,
        metadata,
      }: AminoUpdateGroupPolicyMetadata["value"]): MsgUpdateGroupPolicyMetadata => {
        return {
          admin: admin,
          groupPolicyAddress: groupPolicyAddress,
          metadata: metadata,
        };
      },
    },
  };
};
