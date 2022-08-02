import { Request, Response } from "express";

const attesters = ["did:kilt:4pyAEJGKaS6mJhFcsM7XXTnSM7JVaAf1z4FhADicquou9LWC"];

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
