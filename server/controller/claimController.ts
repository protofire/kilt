import express, { Request, Response } from "express";
import * as Kilt from '@kiltprotocol/sdk-js';
import axios from 'axios';

export const example = async (req: Request, res: Response) => {  
  await Kilt.init({ address: 'wss://peregrine.kilt.io/parachain-public-ws' });
  await Kilt.connect();
  console.log('running john doe example');
  const johnDoeDid = await Kilt.Did.Web3Names.queryDidForWeb3Name('john_doe')
  if (!johnDoeDid) {
    console.log(`john_doe doesn't exist`)
    return res.status(400).json({success: false});
  }
  const johnDoeDidDocument = await Kilt.Did.DidResolver.resolveDoc(johnDoeDid as Kilt.DidUri);
  const endpoints = johnDoeDidDocument?.details?.getEndpoints();
  if (!endpoints) {
    return res.status(400).json({success: false});
  }
  const endpointRequestData = await axios
    .get(endpoints[0].urls[0])
    .then((response) => response.data)
  const attestation = await Kilt.Attestation.query(endpointRequestData[0].credential.rootHash)
  if (!attestation) {
    return res.status(400).json({success: false});
  }
  const credential = Kilt.Credential.fromRequestAndAttestation(
    endpointRequestData[0].credential,
    attestation
  )
  const isCredentialValid = await credential.verify()
  return res.status(200).json({success: true});
}

export const getCredentialsByDid = async (req: Request, res: Response) => {  
  const { did } = req.params;
  return res.status(200).json({success: true});
}