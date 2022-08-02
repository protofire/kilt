import { Request, Response } from "express";

const attesters = [
  "did:kilt:4pyAEJGKaS6mJhFcsM7XXTnSM7JVaAf1z4FhADicquou9LWC",
  "did:kilt:4pyAEJGKaS6mJhFcsM7XXTnSM7JVaAf1z4FhADicquou9LWre",
  "did:kilt:4pyAEJGKaS6mJhFcsM7XXTnSM7JVaAf1z4FhADicq9LWC",
];

// @desc      Create new attesters
// @route     POST /api/attesters
// @access    Private

export async function createAttester(req: Request, res: Response) {
  const { did } = req.body;

  if (!did) {
    return res.status(404).json({
      status: false,
      data: {
        did: "Please provide a valid did",
      },
    });
  }
  attesters.push(did);
  return res.status(200).json({
    status: true,
    data: {
      did,
      message: "DID successfully added to database",
    },
  });
}

// @desc      Get all attesters
// @route     GET /api/attesters
// @access    Public
export async function listAttester(req: Request, res: Response) {
  return res.status(200).json({
    status: true,
    data: {
      attesters,
      message: "DID successfully added to database",
    },
  });
}

// @desc      Get single attesters
// @route     GET /api/attesters/:id
// @access    Public
export async function getAttester(req: Request, res: Response) {
  const did = req.params.id;

  const result = attesters.filter((attester) => attester !== did);
  if (!result) {
    return res.status(404).json({
      status: false,
      data: {
        did: "Access denied, please create a valid did ",
      },
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      did,
      message: "Succesfully logged",
    },
  });
}
