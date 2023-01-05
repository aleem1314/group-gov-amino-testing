import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverters, AminoMsgDeposit } from "@cosmjs/stargate";
import { MsgDeposit, MsgVote } from "../../proto/ts/cosmos/gov/v1/tx";
import { VoteOption } from "../../proto/ts/cosmos/gov/v1/gov";
import Long from "long";

export interface AminoDeposit extends AminoMsg {
  readonly type: "cosmos-sdk/v1/MsgDeposit";
  readonly value: {
    readonly depositor: string;
    readonly proposal_id: string;
    readonly amount: readonly Coin[];
  };
}

export interface AminoVote extends AminoMsg {
  readonly type: "cosmos-sdk/v1/MsgVote";
  readonly value: {
    readonly proposal_id: string;
    readonly voter: string;
    readonly option: VoteOption;
    readonly metadata: string;
  };
}

export function isAminoMsgDeposit(msg: AminoMsg): msg is AminoMsgDeposit {
  return msg.type === "cosmos-sdk/v1/MsgDeposit";
}

export function isAminoMsgVote(msg: AminoMsg): msg is AminoMsgDeposit {
  return msg.type === "cosmos-sdk/v1/MsgVote";
}

export const govv1AminoConverter = (): AminoConverters => {
  return {
    "/cosmos.gov.v1.MsgVote": {
      aminoType: "cosmos-sdk/v1/MsgVote",
      fromAmino(value: AminoVote["value"]): MsgVote {
        return {
          metadata: value.metadata,
          option: value.option,
          proposalId: Long.fromString(value.proposal_id).toNumber(),
          voter: value.voter,
        };
      },
      toAmino(value: MsgVote): AminoVote["value"] {
        return {
          option: value.option,
          proposal_id: value.proposalId.toString(),
          voter: value.voter,
          metadata: value.metadata,
        };
      },
    },
    "/cosmos.gov.v1.MsgDeposit": {
      aminoType: "cosmos-sdk/v1/MsgDeposit",
      fromAmino(value: AminoDeposit["value"]): MsgDeposit {
        return {
          amount: [...value.amount],
          depositor: value.depositor,
          proposalId: Long.fromString(value.proposal_id).toNumber(),
        };
      },
      toAmino(value: MsgDeposit): AminoDeposit["value"] {
        return {
          amount: [...value.amount],
          depositor: value.depositor,
          proposal_id: value.proposalId.toString(),
        };
      },
    },
  };
};
