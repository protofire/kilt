import express, { Request, Response } from "express";
import * as Kilt from '@kiltprotocol/sdk-js';
import axios from 'axios';
import { ICredentialByDidResponse, ICredentialEndpointResponse } from "../interfaces/credentialEndpointResponse";

export const example = async (req: Request, res: Response) => {  
  await Kilt.init({ address: 'wss://peregrine.kilt.io/parachain-public-ws' });
  await Kilt.connect();
  console.log('running john doe example');
  const johnDoeDid = await Kilt.Did.Web3Names.queryDidForWeb3Name('john_doe')
  if (!johnDoeDid) {
    return res.status(400).json({
      success: false,
      message: `john_doe doesn't exist`
    });
  }

  const johnDoeDidDocument = await Kilt.Did.DidResolver.resolveDoc(johnDoeDid as Kilt.DidUri);
  const endpoints = johnDoeDidDocument?.details?.getEndpoints();
  if (!endpoints) {
    return res.status(400).json({
      success: false, 
      message: `No endpoints found for the given did`
    });
  }

  const endpointRequestData = await axios
    .get(endpoints[0].urls[0])
    .then((response) => response.data)
  const attestation = await Kilt.Attestation.query(endpointRequestData[0].credential.rootHash)
  if (!attestation) {
    return res.status(400).json({
      success: false,
      message: `could not find attestation for credential`
    });
  }

  const credential = Kilt.Credential.fromRequestAndAttestation(
    endpointRequestData[0].credential,
    attestation
  )

  const isCredentialValid = await credential.verify()
  return res.status(200).json({success: true});
}

export const getCredentialsByDid = async (req: Request, res: Response) => {
  await Kilt.init({ address: 'wss://peregrine.kilt.io/parachain-public-ws' });
  await Kilt.connect();
  const { did } = req.params;
  
  const didDocument = await Kilt.Did.DidResolver.resolveDoc(did as Kilt.DidUri);
  const endpoints = didDocument?.details?.getEndpoints();
  if (!endpoints) {
    return res.status(200).json({
      success: true, 
      data: []
    });
  }

  const endpointRequestData: ICredentialEndpointResponse[] = await axios
    .get(endpoints[0].urls[0])
    .then((response) => response.data);
  
  const attestation = await Kilt.Attestation.query(
    endpointRequestData[0].credential.rootHash
  )

  if (!attestation) {
    return res.status(400).json({
      success: false,
      message: `could not find attestation for credential`
    });
  }

  const responseData: ICredentialByDidResponse[] = await Promise.all(
    endpointRequestData.map(async(erd) => {
      const attestation = await Kilt.Attestation.query(
        erd.credential.rootHash
      );
      if(!attestation) {
        return {
          attesterDid: 'No Attester',
          label: erd.metadata?.label,
          status: 'unverified'
        }
      }
      const credential = Kilt.Credential.fromRequestAndAttestation(
        erd.credential,
        attestation
      );
      const isVerified = await credential.verify();
      return {
        attesterDid: attestation.owner,
        label: erd.metadata?.label,
        status: isVerified ? 'verified' : 'unverified'
      }
    }
  ));

  return res.status(200).json({success: true, data: responseData});
}