import React, { useState } from "react";
import "./App.css";
import { signAndBroadcast } from "./signing";
import { MsgCreateGroup } from "./proto/ts/cosmos/group/v1/tx";
import { connectKeplr } from "./keplr";
import { MsgVote } from "./proto/ts/cosmos/gov/v1/tx";
import { VoteOption } from "./proto/ts/cosmos/group/v1/types";
import { MsgDeposit } from "./proto/ts/cosmos/gov/v1beta1/tx";

const chainId = "testnet";
const restUrl = "http://localhost:1317";
const prefix = "regen";
const memo = "";
const gas = 260000;
const gasPrice = "10uregen";

function App() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successResult, setSuccessResult] = useState({});
  const [walletInfo, setWalletInfo] = useState({});

  const connectWallet = async () => {
    try {
      const result = await connectKeplr();
      setWalletInfo(result);
    } catch (error) {
      setErrorMsg(error?.message);
    }
  };

  const msgVote = async () => {
    setErrorMsg("");
    setSuccessResult({});
    const msg = {
      typeUrl: "/cosmos.gov.v1.MsgVote",
      value: MsgVote.fromPartial({
        option: VoteOption.VOTE_OPTION_YES,
        proposalId: 1,
        voter: walletInfo?.walletInfo?.bech32Address,
        metadata: "proposal vote",
      }),
    };

    try {
      const result = await signAndBroadcast(
        chainId,
        prefix,
        [msg],
        gas,
        memo,
        gasPrice,
        restUrl
      );
      setSuccessResult(result);
    } catch (error) {
      setErrorMsg(error?.message);
    }
  };

  const msgDeposit = async () => {
    setErrorMsg("");
    setSuccessResult({});
    const msg = {
      typeUrl: "/cosmos.gov.v1.MsgDeposit",
      value: MsgDeposit.fromPartial({
        amount: [
          {
            amount: "1000",
            denom: "uregen",
          },
        ],
        depositor: walletInfo?.walletInfo?.bech32Address,
        proposalId: 1,
      }),
    };

    try {
      const result = await signAndBroadcast(
        chainId,
        prefix,
        [msg],
        gas,
        memo,
        gasPrice,
        restUrl
      );
      setSuccessResult(result);
    } catch (error) {
      setErrorMsg(error?.message);
    }
  };

  const createGroup = async () => {
    setErrorMsg("");
    setSuccessResult({});
    const msg = {
      typeUrl: "/cosmos.group.v1.MsgCreateGroup",
      value: MsgCreateGroup.fromPartial({
        admin: walletInfo?.walletInfo?.bech32Address,
        members: [
          {
            address: walletInfo?.walletInfo?.bech32Address,
            metadata: "member1",
            weight: "10",
          },
        ],
        metadata: "group1",
      }),
    };
    try {
      const result = await signAndBroadcast(
        chainId,
        prefix,
        [msg],
        gas,
        memo,
        gasPrice,
        restUrl
      );
      setSuccessResult(result);
    } catch (error) {
      setErrorMsg(error);
    }
  };

  return (
    <div className="App">
      <br />
      <h6>Wallet Address:&nbsp;{walletInfo?.walletInfo?.bech32Address}</h6>
      {!walletInfo?.walletInfo?.bech32Address ? (
        <button onClick={() => connectWallet()}>Connect wallet</button>
      ) : null}
      {walletInfo?.walletInfo?.bech32Address ? (
        <>
          <br />
          <button onClick={() => createGroup()}>Create group</button>
          <br />
          <br />
          <button onClick={() => msgDeposit()}>Gov Deposit</button>

          <br />
          <br />
          <button onClick={() => msgVote()}>Gov Vote</button>

          <br />

          <ul>
            <li>
              Deposit action will deposit <b>1000uregen</b> to proposal <b>1</b>
              .
            </li>
            <li>
              Vote action will cast <b>yes</b> vote to proposal <b>1</b>.
            </li>
          </ul>
        </>
      ) : null}
      {errorMsg?.length > 0 ? (
        <p
          style={{
            color: "red",
          }}
        >
          {JSON.stringify(errorMsg)}
        </p>
      ) : null}
      {successResult?.code === 0 ? (
        <p>{JSON.stringify(successResult)}</p>
      ) : null}
    </div>
  );
}

export default App;
